import React from 'react';

const SidePanel = ({ isOpen, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-1000 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 overflow-y-auto h-full">
        {children}
      </div>
    </div>
  );
};

export default SidePanel;

