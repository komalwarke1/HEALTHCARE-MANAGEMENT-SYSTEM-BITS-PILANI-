import React from 'react';

export const Select = ({ label, id, options, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <select
        id={id}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

