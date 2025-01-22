// components/Label.jsx
import React from 'react';

const Label = ({ htmlFor, children, style }) => {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        ...style,
      }}
    >
      {children}
    </label>
  );
};

export default Label;
