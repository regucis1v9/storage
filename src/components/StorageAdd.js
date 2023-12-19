import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import { faWarehouse, faTruck, faCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function StorageAdd() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedShelf, setSelectedShelf] = useState('');

  useEffect(() => {
    // Fetch orders from the database on component mount
    fetch('http://localhost/api/getOrders.php')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleEnterClick = () => {
    if (selectedOrderId && selectedShelf) {
      fetch('http://localhost/api/updateShelf.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: selectedOrderId,
          shelf: selectedShelf,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Shelf updated successfully!');
          } else {
            alert(`Error updating shelf: ${data.error}`);
          }
        })
        .catch((error) => {
          console.error('Error updating shelf:', error);
          alert('An error occurred while updating the shelf.');
        });
    }
  };

  return (
    <div className='containerStorage-mar'>
      <div className="topBar-mar"><span className='spanTop-mar'>STORAGE</span></div>
      <div className="storageContainer-mar">
        <div className='storageContainerHeading'>ADD COMPONENTS</div>
        <div className='componentBox'>
          <div className='orderSelection'>
          <div className='selectTitle'>ORDER ID</div>
            <select className='idSelect'
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
            >
              <option value="" disabled>Select Order ID</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.id}
                </option>
              ))}
            </select>
          </div>
          <div className='selectTitle'>SHELF</div>
          <select
            className='shelfSelect'
            value={selectedShelf}
            onChange={(e) => setSelectedShelf(e.target.value)}
          >
            <option value="" disabled>Select Shelf</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="B3">B3</option>
            <option value="B4">B4</option>
          </select>
          <button className='botStorageButton' onClick={handleEnterClick}>
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}

export default StorageAdd;
