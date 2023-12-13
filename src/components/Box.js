// Box.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Box({ icon, text, location, notiStyle }) {
  return (
    <Link to={location} className="box-mar">
      <div className="iconBox-mar">
        <FontAwesomeIcon className="icon" icon={icon} />
      </div>
      <div className="boxRight-mar">
        <div className="blankBox-mar"></div>
        <div className="textBox-mar">
          <span className="spanRight-mar">{text}</span>
        </div>
        <div className="notiBox-mar">
          <div className={notiStyle}></div>
        </div>
      </div>
    </Link>
  );
}

export default Box;