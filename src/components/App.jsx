import React from 'react';
import '../css/styles.css';
import Box from './Box.js';
import { faWarehouse, faTruck, faCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';


function App() {
  
  return (
    <div className='container-mar'>
        <div className="topBar-mar"><span className='spanTop-mar'>NOLIKTAVAS DARBINIEKS</span></div>
        <div className="boxContainer-mar">
        <Box icon={faWarehouse} text="STORAGE" notiStyle="noti-mar-off" location="../StorageAdd"/>
        <Box icon={faWarehouse} text="STORAGEEDD" notiStyle="noti-mar-off" location="StorageEdit"/>
        <Box icon={faTruck} text="ORDER" notiStyle="noti-mar-off" location="test"/>
        <Box icon={faCheck} text="O-CHECK" notiStyle="noti-mar-on" location="OrderCheck"/>
        <Box icon={faFile} text="REPORTS" notiStyle="noti-mar-on"/>
        <Box icon={faEnvelope} text="MESSAGE" notiStyle="noti-mar-off" location="Mail"/>
       
        </div>
    </div>
  );
}

export default App;
