import React from 'react';

const SortingControls = ({ onSortChange, sortField }) => {
  return (
    <div className="mb-6 flex items-center">
      <label htmlFor="sort" className="mr-3 text-gray-700 font-medium">Sort by:</label>
      <select
        id="sort"
        value={sortField}
        onChange={(e) => onSortChange(e.target.value)}
        className="border rounded-md py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="date">Date</option>
        <option value="time">Time</option>
        <option value="patientName">Patient Name</option>
      </select>
    </div>
  );
};

export default SortingControls;

