import React from "react";
import CloseIcon from "../assets/close.svg";

export default function Tag({ data, onClick }) {
  return (
    <div className="tag-wrapper">
      <div className="img-wrapper">
        <img
          src={data.image || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
        />
      </div>
      <div className="text">{data.label}</div>
      <div onClick={() => onClick(data)} className="back-button">
        <img src={CloseIcon} />
      </div>
    </div>
  );
}
