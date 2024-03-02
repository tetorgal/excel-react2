import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
export default function StylizedFileInput() {
  return (
    <>
      <style>
        {`
        .custom-file-upload {
          border: 1px solid #ccc;
          display: inline-block;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 4px;
        margin-bottom: 10px;
        }
        .custom-file-upload:hover{
            background-color: #ddd;
        }
        input[type="file"] {
          display: none;

        }
        `}
      </style>
      <label className="custom-file-upload">
        <input type="file" />
        <FaCloudUploadAlt /> Subir Archivo
      </label>
    </>
  );
}
