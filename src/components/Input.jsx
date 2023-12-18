import React from 'react';

const Input = ({ label, type, inputValue, handleInputChange, options }) => {
  return (
    <div className="inputContainer">
      <label className='inputLabel'>{label}</label>
      {type === 'dropdown' ? (
        <select
          className="input"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        >
          <option value="" disabled hidden>{`Select a ${label.toLowerCase()}`}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="input"
          type={type}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default Input;
