import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BiError } from "react-icons/bi";
import { Avatar } from "../avatar";
import "./contractorForm.scss";

export const ContractorForm = () => {
  const [selectedValue, setSelectedValue] = useState("Company");
  const [inputValue, setInputValue] = useState({
    name: "",
    surname: "",
    id: "",
  });
  const [submit, setSubmit] = useState(false);
  const [validate, setValidate] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const validateRef = useRef<HTMLInputElement>(null);
  const typeSelect = selectedValue === "Company" ? "Tax ID" : "Person ID";

  const validateForm = () => {
    const regNameSurname = /^[a-zA-Z]+$/;
    const regTax = /[0-9]{10}/;
    const regId = /[0-9]{11}/;

    if (!inputValue.name) {
      setValidate("Name is required");
    } else if (!inputValue.name.match(regNameSurname)) {
      setValidate("Name is invalid");
    } else if (!inputValue.surname) {
      setValidate("Surname is required");
    } else if (!inputValue.surname.match(regNameSurname)) {
      setValidate("Surname is invalid");
    } else if (selectedValue === "Company" && !inputValue.id) {
      setValidate("Tax id required");
    } else if (selectedValue === "Company" && !inputValue.id.match(regTax)) {
      setValidate("Tax ID requires 10 digits");
    } else if (selectedValue === "Person" && !inputValue.id) {
      setValidate("Person id required");
    } else if (selectedValue === "Person" && !inputValue.id.match(regId)) {
      setValidate("Person ID is invalid");
    } else if (inputRef?.current?.files?.length == 0) {
      setValidate("Add photo");
    } else {
      setValidate("");
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedValue(e.target.value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    validateForm();
    setSubmit(true);
  };

  // AXIOS POST
  useEffect(() => {
    if (validate === "" && submit) {
      axios
        .post("/Contractor/Save", {
          name: inputValue.name,
          surname: inputValue.surname,
          person: selectedValue,
          id: inputValue.id,
        })
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setSubmitMessage("Save method not found");
          }
        });
      setSubmit(false);
      setInputValue({
        name: "",
        surname: "",
        id: "",
      });
      inputRef.current!.value = "";
      setSelectedValue("Company");
    }
  }, [handleSubmit]);

  // GO TO VALIDATE MESSAGE AFTER SUBMIT
  useEffect(() => {
    validateRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [validate]);

  return (
    <div className="form-container">
      <div className="left-side-box">
        <div className="content-left-box">
          <h2>Contractor</h2>
          <h1>Form</h1>
          {!submit && submitMessage !== "" ? null : (
            <Avatar inputRef={inputRef} />
          )}
        </div>
      </div>
      {!submit && submitMessage !== "" ? (
        <div className="error-post">
          <BiError />
          <h2>{submitMessage}</h2>
        </div>
      ) : (
        <form>
          <div
            ref={validateRef}
            className="error-viewer"
            style={{ display: `${!validate ? "none" : "flex"}` }}
          >
            <p>{validate}</p>
          </div>
          <div>
            <label>Name</label>
            <input
              value={inputValue.name}
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleInput}
            ></input>
          </div>
          <div>
            <label>Surname</label>
            <input
              value={inputValue.surname}
              name="surname"
              placeholder="Your Surname"
              onChange={handleInput}
            ></input>
          </div>
          <div>
            <label>You are</label>
            <select onChange={handleSelect} name="type">
              <option value="Company">Company</option>
              <option value="Person">Person</option>
            </select>
          </div>
          <div>
            <label>{typeSelect}</label>
            <input
              value={inputValue.id}
              name="id"
              placeholder={`Your ${typeSelect} number`}
              onChange={handleInput}
            ></input>
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Send it!
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContractorForm;
