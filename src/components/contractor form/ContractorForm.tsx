import React, { useState } from "react";
import "./contractorForm.scss";

export const ContractorForm = () => {
  const [selectedValue, setSelectedValue] = useState("Company");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedValue(e.target.value);
  };

  const typeSelect = selectedValue === "Company" ? "Tax ID" : "Person ID";

  return (
    <div className="form-container">
      <div className="left-side-box">
        <div className="error-viewer">
          <p>You must write the name</p>
        </div>
        <div className="content-left-box">
          <h2>Contractor</h2>
          <h1>Form</h1>
          <div className="profile-face" style={{ display: "none" }}></div>
          <p>Hello! Fill in the form details and send it.</p>
        </div>
      </div>
      <form>
        <div>
          <label>Name</label>
          <input type="text" name="name" placeholder="Your Name"></input>
        </div>
        <div>
          <label>Surname</label>
          <input name="surname" placeholder="Your Surname"></input>
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
            name="number-type"
            placeholder={`Your ${typeSelect} number`}
          ></input>
        </div>
        <div>
          <label>Add Photo JPG / JPEG</label>
          <input name="file" className="file" type="file"></input>
        </div>
        <div>
          <button> Send it!</button>
        </div>
      </form>
    </div>
  );
};

export default ContractorForm;
