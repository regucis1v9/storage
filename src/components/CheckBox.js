import React from 'react';

function CheckBox({ orderId, dateOrdered, estimated, toggleDetails }) {
  const handleDeliveredClick = () => {
    fetch('http://localhost:8888/storageAPI/updateOrderStatus.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the UI or take any other necessary action
          console.log('Order status updated successfully');
          toggleDetails(); // Toggle visibility after successful update
        } else {
          console.error('Error updating order status:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };

  return (
    <div className='orderBox-mar'>
      <div className='productHeading-mar'>order {orderId}</div>
      <div className='orderInfoBox-mar'>
        <div className='dateOrdered'>
          <div className='orderTitle'>ORDERED</div>
          <div className='deliveryTime'>{dateOrdered}</div>
        </div>
        <div className='dateOrdered'>
          <div className='orderTitle'>ESTIMATED DELIVERY</div>
          <div className='deliveryTime'>{estimated}</div>
        </div>
      </div>
      <button className='seeMore-mar' onClick={handleDeliveredClick}>
        DELIVERED
      </button>
      <button className='seeMore-mar' onClick={toggleDetails}>
        DETAILS
      </button>
    </div>
  );
}

export default CheckBox;
