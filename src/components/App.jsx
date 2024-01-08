import React, { useEffect } from 'react';
import '../css/styles.css';
import Box from './Box.js';
import { faWarehouse, faTruck, faCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const role = Cookies.get('role');
  console.log(role);
  useEffect(() => {
    if (role !== 'darbinieks') {
      navigate('../login');
    }
  }, [navigate]);
  return (
    <div className='container-mar'>
        <div className="topBar-mar"><span className='spanTop-mar'>STORAGE WORKER</span></div>
        <div className="boxContainer-mar">
        <Box icon={faWarehouse} text="STORAGE" notiStyle="noti-mar-off" location="../StorageAdd"/>
        <Box icon={faTruck} text="ORDER" notiStyle="noti-mar-off" location="../test"/>
        <Box icon={faCheck} text="O-CHECK" notiStyle="noti-mar-on" location="../OrderCheck"/>
        <Box icon={faFile} text="REPORTS" notiStyle="noti-mar-on"location="../report"/>
        <Box icon={faEnvelope} text="MESSAGE" notiStyle="noti-mar-off" location="../Mail"/>
        <Box icon={faEnvelope} text="PRODUCTS" notiStyle="noti-mar-off" location="../AllProducts"/>
        </div>
    </div>
  );
}

export default App;
