import React, { useState, useEffect } from 'react';
import '../css/styles.css';
function StorageEdit() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the database on component mount
    fetch('http://localhost:8888/storageAPI/getOrders.php')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div className='containerStorage-mar'>
      <div className="topBar-mar"><span className='spanTop-mar'>STORAGE</span></div>
      <div className="storageContainer-mar">
        <div className='storageContainerHeading'>EDIT COMPONENTS</div>
        <div className='usedItem'>STORAGE ITEM, SHELF</div>
        <div className='componentBox2'>
          {orders.map((order) => (
            <div key={order.id} className='storageItem'>
              ID: {order.id}
            </div>
          ))}
        </div>
        <button className='botStorageButton2'>CHANGE</button>
      </div>
    </div>
  );
}

export default StorageEdit;
