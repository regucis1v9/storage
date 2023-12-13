import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import CheckBox from './CheckBox.js';
import OrderedBox from './OrderedBox.js';
import OrderDetails from './OrderDetails.js';

function OrderCheck() {
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  // Fetch orders from the database on component mount
  useEffect(() => {
    fetch('http://localhost/api/getOrders.php')
      .then((response) => response.json())
      .then((data) => {
        // Separate incoming and delivered orders
        const incoming = data.filter((order) => order.status === 'incoming');
        const delivered = data.filter((order) => order.status === 'delivered');

        setIncomingOrders(incoming);
        setDeliveredOrders(delivered);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

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

      {isDetailsVisible && (
        <div className='invisContainer-mar'>
          <OrderDetails isVisibleProp={isDetailsVisible} toggleVisibility={toggleDetailsVisibility} />
        </div>
      )}
    </div>
  );
}

export default OrderCheck;
