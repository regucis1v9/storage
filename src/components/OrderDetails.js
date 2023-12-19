import React, { useState, useEffect } from 'react';

function OrderDetails({ isVisible, toggleVisibility, orderId }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`http://localhost/api/getOrderDetails.php?orderId=${orderId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Order details data:', data);
          setOrderDetails(data[0]);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
          setError('Error fetching order details');
        });
    }
  }, [orderId]);

  const displayStyle = isVisible ? { display: 'flex' } : { display: 'none' };

  return (
    <div className={`invisContainer-mar ${isVisible ? 'visible' : 'hidden'}`} style={displayStyle}>
      <div className='invisTopBar-mar'>
        <div className='invisHeading'>ORDER DETAILS</div>
      </div>

      <button className='closeButton' onClick={toggleVisibility}>
        X
      </button>

      {orderDetails && (
        <>
          <div className='infoBox-mar'>
            <div className='infoHeading'>COLOR</div>
            <div className='infoText'>{orderDetails.color}</div>
          </div>
          {/* Add other infoBox-mar elements here */}
        </>
      )}

      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default OrderDetails;
