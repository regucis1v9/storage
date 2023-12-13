// Box.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Supplier({imageSRC, name, location}) {
  return (
    <Link to={location} className='supplierBox-mar'>
      <img src={imageSRC} className="backgroundImage-mar"></img>
      <div className="imageText-mar">{name}</div>

   </Link>
  );
}

export default Supplier;
