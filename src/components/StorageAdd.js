import React, { useState, useEffect } from 'react';
import '../css/styles.css';

function StorageAdd() {
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
        <div className='storageContainerHeading'>ADD COMPONENTS</div>
        <div className='componentBox'>
          {orders.map((order) => (
            <div key={order.id} className='storageItem'>
              ID: {order.id}
            </div>
          ))}
        </div>
        <select className='shelfSelect'>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="A4">A4</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="B3">B3</option>
          <option value="B4">B4</option>
        </select>
        <button className='botStorageButton'>ENTER</button>
      </div>
    </div>
  );
}

export default StorageAdd;
