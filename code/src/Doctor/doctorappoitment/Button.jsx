// components/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: '#1fa347',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
