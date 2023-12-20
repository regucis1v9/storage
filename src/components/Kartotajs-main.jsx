import React from 'react';
import { useEffect } from 'react';
import '../css/styles.css';
import Box from './Box.js';
import { faTruck, faCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function KartotajsMain() {
  const navigate = useNavigate();
  const role = Cookies.get('role');
  useEffect(() => {
    if (role !== 'kartotajs') {
      navigate('../login');
    }
  }, [navigate]);
  return (
    <div className='container-mar'>
        <div className="topBar-mar"><span className='spanTop-mar'>SHELF SORTER</span></div>
        <div className="boxContainer-mar">
        <Box icon={faTruck} text="STORAGE" notiStyle="noti-mar-off" location="/KartotajsStorage"/>
        <Box icon={faCheck} text="REPORTS" notiStyle="noti-mar-on" location='/KartotajsReports'/>
        <Box icon={faEnvelope} text="MESSAGES" notiStyle="noti-mar-off" location="/KartotajsMessages"/>
        <Box icon={faEnvelope} text="MAIL" notiStyle="noti-mar-off" location="../Mail"/>
       
        </div>
    </div>
  );
}

export default KartotajsMain;