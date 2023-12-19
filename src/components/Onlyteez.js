import React, { useState } from 'react';
import '../css/styles.css';
import TeezBox from './TeezBox.js';

function Onlyteez() {
  const [quantities, setQuantities] = useState({
    BLUE: 0,
    RED: 0,
    WHITE: 0,
    BLACK: 0,
    MAGENTA: 0,
    PINK: 0,
  });

  const [selectedSizes, setSelectedSizes] = useState({
    BLUE: '',
    RED: '',
    WHITE: '',
    BLACK: '',
    MAGENTA: '',
    PINK: '',
  });

  const [selectedTypes, setSelectedTypes] = useState({
    BLUE: '',
    RED: '',
    WHITE: '',
    BLACK: '',
    MAGENTA: '',
    PINK: '',
  });

  const [sortOption, setSortOption] = useState(''); // Initialize with an empty string

  const boxPrices = {
    BLUE: 25,
    RED: 15,
    WHITE: 225,
    BLACK: 5,
    MAGENTA: 23,
    PINK: 75,
  };

  const updateQuantity = (color, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [color]: quantity,
    }));
  };

  const calculateTotal = () => {
    const total = Object.keys(quantities).reduce((acc, color) => {
      const quantity = quantities[color];
      const boxPrice = boxPrices[color] || 25;
      return acc + quantity * boxPrice;
    }, 0);
    return total;
  };

  const handleBuyClick = (e) => {
    e.preventDefault();
  
    const items = Object.keys(quantities).map((color) => ({
      color,
      size: selectedSizes[color],
      type: selectedTypes[color],
      amount: quantities[color],
    }));
  
    // Filter out items with amount 0
    const validItems = items.filter((item) => item.amount > 0);
  
    if (validItems.length === 0) {
      console.log('No items to submit.');
      return;
    }
  
    // Calculate total
    const total = calculateTotal();
  
    // Set supplier and delivery time based on the supplier
    const supplier = 'Onlyteez';
    const deliveryTime = 5;
  
    // Calculate orderDate and deliveryDate
    const orderDate = new Date();
const deliveryDate = new Date(orderDate);
deliveryDate.setDate(orderDate.getDate() + deliveryTime);
  
    const orderData = {
      supplier,
      items: validItems,
      total,
      orderDate,
      deliveryDate,
    };
  
    fetch('http://localhost/api/submitOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Order submitted successfully:', data);
        // Clear input fields and reset state
        setQuantities({
          BLUE: 0,
          RED: 0,
          WHITE: 0,
          BLACK: 0,
          MAGENTA: 0,
          PINK: 0,
        });
        setSelectedSizes({
          BLUE: '',
          RED: '',
          WHITE: '',
          BLACK: '',
          MAGENTA: '',
          PINK: '',
        });
        setSelectedTypes({
          BLUE: '',
          RED: '',
          WHITE: '',
          BLACK: '',
          MAGENTA: '',
          PINK: '',
        });
      })
      .catch((error) => {
        alert('Error submitting order:', error);
      });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortTeezBoxes = () => {
    // Create an array of TeezBox components
    const teeBoxes = Object.keys(boxPrices).map((color) => (
      <TeezBox
        key={color}
        title={color}
        price={boxPrices[color]}
        updateQuantity={updateQuantity}
        selectedSize={selectedSizes[color]}
        selectedType={selectedTypes[color]}
        onSizeChange={(size) =>
          setSelectedSizes((prevSizes) => ({ ...prevSizes, [color]: size }))
        }
        onTypeChange={(type) =>
          setSelectedTypes((prevTypes) => ({ ...prevTypes, [color]: type }))
        }
      />
    ));

    // Sort the array based on the selected sort option
    switch (sortOption) {
      case 'price':
        teeBoxes.sort((a, b) => boxPrices[a.key] - boxPrices[b.key]);
        break;
      case 'A-Z':
        teeBoxes.sort((a, b) => a.key.localeCompare(b.key));
        break;
      case 'Z-A':
        teeBoxes.sort((a, b) => b.key.localeCompare(a.key));
        break;
      default:
        // No sorting
        break;
    }

    return teeBoxes;
  };

  return (
    <div className='container-mar'>
      <div className='topBar-mar'>
        <span className='spanTop-mar'>ORDER</span>
      </div>
      <div className='orderContainer2-mar'>
        <form onSubmit={handleBuyClick}>
          <div className='containerHeading-mar'>
            <span className='containerSpan-mar'>ONLYTEEZ</span>
          </div>
          <div className='containerMidBox-mar'>
            <div className='selectContainer'>
              <select
                className='boxSelect-mar'
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value=''>SORT</option>
                <option value='price'>Price</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
              </select>
            </div>

            {/* Render TeezBox components based on the sorted order */}
            {sortTeezBoxes()}

          </div>
          <div className='bottomContainer-mar'>
            <div className='empty-mar'></div>
            <div className='totalBox'>
              <div className='totalNumberBox'>
                <span className='totalSpan-mar'>TOTAL: </span>
                <span className='numberSpan'>{calculateTotal()}</span>
              </div>
            </div>
            <div className='buyBox-mar'>
              <button type='submit' className='buyButton-mar'>
                buy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onlyteez;
