import React from 'react';
import { FiInfo } from 'react-icons/fi';

const Legend = () => {
  return (
    <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-md">
      <h3 className="font-semibold mb-2 flex items-center text-sm text-gray-700">
        <FiInfo className="mr-1 text-gray-500" /> Map Legend
      </h3>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-1"></div>
          <span className="text-xs text-gray-600">Hospital</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-1"></div>
          <span className="text-xs text-gray-600">Your Location</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;

