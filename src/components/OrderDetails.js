import React, { useState } from 'react';

function OrderDetails({ isVisibleProp, toggleVisibility }) {
  const [isVisible, setIsVisible] = useState(isVisibleProp);

  const toggleLocalVisibility = () => {
    setIsVisible(!isVisible);
    toggleVisibility();
  };

  const displayStyle = isVisible ? { display: 'flex' } : { display: 'none' };

  return (
    <div className='invisContainer2-mar' style={displayStyle}>
      <div className='invisTopBar-mar'>
        <div className='invisHeading'>ORDER HEADING</div>
      </div>

      <button className='closeButton' onClick={toggleLocalVisibility}>
        X
      </button>

      <div className='infoBox-mar'>
        <div className='infoHeading'>COLOR</div>
        <div className='infoText'>BLUE</div>
      </div>
      <div className='infoBox-mar'>
        <div className='infoHeading'>TYPE</div>
        <div className='infoText'>V-NECK</div>
      </div>
      <div className='infoBox-mar'>
        <div className='infoHeading'>AMOUNT</div>
        <div className='infoText'>3</div>
      </div>
      <div className='infoBox-mar'>
        <div className='infoHeading'>DATE ORDERED</div>
        <div className='infoText'>12.12.2023</div>
      </div>
      <div className='infoBox-mar'>
        <div className='infoHeading'>DATE DELIVERED</div>
        <div className='infoText'>13.13.2025</div>
      </div>
      <div className='infoBox-mar'>
        <div className='infoHeading'>SUPPLIER</div>
        <div className='infoText'>LATVIJAS PASTS</div>
      </div>
      <div className='infoBox-mar'>
        <div className='infoHeading'>DELIVERY ID</div>
        <div className='infoText'>1</div>
      </div>
      
    </div>
  );
}

export default OrderDetails;
