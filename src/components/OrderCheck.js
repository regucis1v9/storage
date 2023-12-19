import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import CheckBox from './CheckBox.js';
import OrderedBox from './OrderedBox.js';
import OrderDetails from './OrderDetails.js';

function OrderCheck() {
  const [orders, setOrders] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleDetailsVisibility = (orderId) => {
    setSelectedOrder(orderId);
    setIsDetailsVisible(!isDetailsVisible);
  };

  // Fetch orders from the database on component mount
  useEffect(() => {
    fetch('http://localhost/api/getOrders.php')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const incomingOrders = orders.filter((order) => order.status === 'incoming');
  const deliveredOrders = orders.filter((order) => order.status === 'delivered');


  return (
    <div className='container-mar'>
      <div className='topBar-mar'>
        <span className='spanTop-mar'>ORDER CHECK</span>
      </div>
      <div className='orderContainerCheck-mar'>
        <div className='containerHeading-mar'>
          <span className='containerSpan-mar'>CURRENT ORDERS</span>
        </div>
        <div className='left-mar'>
          <div className='title-mar'>INCOMING ORDERS</div>
          {incomingOrders.map((order) => (
          <CheckBox
            key={order.id}
            orderId={order.id}
            dateOrdered={order.orderDate}
            estimated={order.deliveryDate}
            toggleDetails={toggleDetailsVisibility}
          />
        ))}
        </div>
        <div className='right-mar'>
          <div className='title-mar'>DELIVERED ORDERS</div>
          {deliveredOrders.map((order) => (
          <OrderedBox
            key={order.id}
            orderId={order.id}
            dateArrived={order.deliveryDate}
            toggleDetails={toggleDetailsVisibility}
          />
        ))}
        </div>
      </div>

      {isDetailsVisible && selectedOrder && (
  
    <OrderDetails
      isVisible={isDetailsVisible}
      toggleVisibility={() => toggleDetailsVisibility(null)}
      orderId={selectedOrder}
    />
  
)}
    </div>
  );
}

export default OrderCheck;
