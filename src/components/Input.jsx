import React, { useState } from 'react';
import '../css/App.css';

function Input({ label, type, onChange }) {
  // Local state for the input value
  const [inputValue, setInputValue] = useState('');

  // Handler for updating the local state and notifying the parent component
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Notify the parent component of the change
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="inputContainer">
      <label className='inputLabel'>{label}</label>
      <input
        className="input"
        type={type}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
export default Input;