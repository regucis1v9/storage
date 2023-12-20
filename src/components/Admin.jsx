import React from 'react';
import { useEffect } from 'react';
import '../css/styles.css';
import Box from './Box.js';
import { faTruck, faCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Admin() {
  const navigate = useNavigate();
  const role = Cookies.get('role');
  useEffect(() => {
    if (role !== 'admin') {
      navigate('../login');
    }
  }, [navigate]);
  return (
    <div className='container-mar'>
        <div className="topBar-mar"><span className='spanTop-mar'>ADMIN</span></div>
        <div className="boxContainer-mar">
        <Box icon={faTruck} text="STORAGE" notiStyle="noti-mar-off" location="../AllProducts"/>
        <Box icon={faCheck} text="REPORTS" notiStyle="noti-mar-on"/>
        <Link to="../ManageUsers" className="box-mar">
          <div className="iconBox-mar">
            <FontAwesomeIcon className="icon" icon={faFile} />
          </div>
          <div className="boxRight-mar">
            <div className="blankBox-mar"></div>
            <div className="textBox-mar ">
              <span className="spanRight-mar lh45">MANAGE USERS</span>
            </div>
            <div className="notiBox-mar">
              <div className='noti-mar-on'></div>
            </div>
          </div>
        </Link>
        <Box icon={faEnvelope} text="APPLICANTS" notiStyle="noti-mar-off" location="../applicants"/>
        <Box icon={faEnvelope} text="MESSAGE" notiStyle="noti-mar-off" location="../Mail"/>
       
        </div>
    </div>
  );
}

export default Admin;