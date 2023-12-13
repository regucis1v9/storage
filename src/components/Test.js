import React from 'react';
import '../css/styles.css';
import { faWarehouse, faTruck, faCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Supplier from './Supplier.js';
import China from './images/china.png';
import Appa from './images/Appa.png';
import Only from './images/only.png';
import Zega from './images/zega.png';


function Test() {
  
  return (
    <div className='container-mar'>
        <div className="topBar-mar"><span className='spanTop-mar'>ORDER</span></div>
        <div className="orderContainer-mar">
            <div className='containerHeading-mar'><span className='containerSpan-mar'>SUPPLIERS</span></div>
            <Supplier imageSRC={China} name="MADE-IN-CHINA" location="/MadeInChina" />
            <Supplier imageSRC={Appa} name="APPAERIFY" location="/Appaerify"/>
            <Supplier imageSRC={Only} name="ONLYTEEZ" location="/Onlyteez"/>
            <Supplier imageSRC={Zega} name="ZEGA-APPAREL" location="/Zega"/>
            
        </div>
    </div>
  );
}

export default Test;
