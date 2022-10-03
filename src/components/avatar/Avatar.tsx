import React, { useState } from "react";
import { BsCamera } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import "./avatar.scss";

interface IProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Avatar = ({ inputRef }: IProps) => {
  const [file, setFile] = useState("");
  const handleShowFile = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="avatar-container">
      <div
        className="profile-view"
        style={{
          backgroundImage: `url(${file})`,
        }}
      >
        {!file ? <FaUserCircle /> : null}
      </div>
      <div>
        <label htmlFor="image" className="file-button">
          <BsCamera />
        </label>
        <input
          id="image"
          type="file"
          ref={inputRef}
          accept="image/jpg, image/jpeg"
          onChange={handleShowFile}
        ></input>
      </div>
    </div>
  );
};
