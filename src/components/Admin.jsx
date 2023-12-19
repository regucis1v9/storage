import React from 'react';
import { useEffect } from 'react';
import '../css/styles.css';
import Box from './Box.js';
import { faTruck, faCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role');
    if (role !== 'admin') {
      navigate('../login');
    }
  }, [navigate]);
  return (
    <div className='container-mar'>
        <div className="topBar-mar"><span className='spanTop-mar'>NOLIKTAVAS DARBINIEKS</span></div>
        <div className="boxContainer-mar">
        <Box icon={faTruck} text="PRODUCT LIST" notiStyle="noti-mar-off" location="../applicants"/>
        <Box icon={faCheck} text="REPORTS" notiStyle="noti-mar-on" location="../applicants"/>
        <Box icon={faFile} text="STORAGE" notiStyle="noti-mar-on" location="../applicants"/>
        <Box icon={faEnvelope} text="APPLICANTS" notiStyle="noti-mar-off" location="../applicants"/>
       
        </div>
    </div>
  );
}

export default Admin;