import React from 'react';
import { FiArrowRight, FiCornerUpRight, FiCornerUpLeft } from 'react-icons/fi';

const getDirectionIcon = (direction) => {
  switch (direction) {
    case 'right':
      return <FiCornerUpRight />;
    case 'left':
      return <FiCornerUpLeft />;
    default:
      return <FiArrowRight />;
  }
};

const RouteGuide = ({ steps }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Turn-by-Turn Directions</h3>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 mt-1">{getDirectionIcon(step.direction)}</span>
            <div>
              <p className="font-medium">{step.instruction}</p>
              <p className="text-sm text-gray-600">{step.distance.toFixed(2)} km</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RouteGuide;