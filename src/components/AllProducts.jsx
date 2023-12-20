import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AllProducts() {

    const navigate = useNavigate();

    useEffect(() => {
      const role = Cookies.get('role');
      if (role !== 'darbinieks' && role !== 'admin') {
        navigate('../login');
      }
    }, [navigate]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch delivered orders when the component mounts
    getOrders();
  }, []);

  const getOrders = () => {
    fetch('http://localhost:8888/storageAPI/getOrders.php') // Replace with your actual PHP script
      .then(response => response.json())
      .then(data => setOrders(data.filter(order => order.status === 'delivered')))
      .catch(error => console.error('Error fetching orders:', error));
  };

  return (
    <div className='containerStorage-mar'>
      <div className="topBar-mar"><span className='spanTop-mar'>STORAGE</span></div>
      <div className="messageContainer-mar">
        <div className='storageContainerHeading'>DELIVERED PRODUCTS</div>
        {orders.map(order => (
          <div key={order.id} className='itemBox'>
            <div className='itemRow'>
              <div className='itemID'>#{order.id}</div>
              <div className='itemSup'>{order.supplier}</div>
              <div className='itemSup'>{order.color}</div>
              <div className='itemSup'>{order.size}</div>
              <div className='itemSup'>{order.type}</div>
              <div className='itemID'>{order.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;