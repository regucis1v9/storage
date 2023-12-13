// OrderBox.js
import React from 'react';

function OrderBox({ title, price, updateQuantity }) {
  return (
    <div className='productBox-mar'>
      <div className='productHeading-mar'>
        {title} <span className='midSpan'>/</span> <span className='priceSpan'>{price}</span>$
      </div>
      <div className='selectContainer2'>
        <select className='sizeSelect-mar'>
        <option>XXL</option>
          <option>XL</option>
          <option>L</option>
          <option>M</option>
          <option>S</option>
          <option>XS</option>
        </select>
        <input
          className='sizeSelect-mar'
          type='number'
          placeholder='AMOUNT'
          onChange={(e) => {
            const newValue = e.target.value.trim() === '' ? 0 : parseInt(e.target.value, 10);
            updateQuantity(title, newValue);
          }}
        />
      </div>
    </div>
  );
}

export default OrderBox;
