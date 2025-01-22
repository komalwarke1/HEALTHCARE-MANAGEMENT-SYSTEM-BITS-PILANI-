// components/Input.jsx
import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, style }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: '8px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        ...style,
      }}
    />
  );
};

export default Input;
