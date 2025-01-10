import React, { useState } from 'react';
import PropTypes from 'prop-types';

const HospitalFilter = ({ hospitals, setFilteredHospitals, hospitalTypes }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10);

  const handleTypeChange = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
    applyFilters(updatedTypes, maxDistance);
  };

  const handleDistanceChange = (distance) => {
    setMaxDistance(distance);
    applyFilters(selectedTypes, distance);
  };

  const applyFilters = (types, distance) => {
    const filtered = hospitals.filter(hospital => 
      (types.length === 0 || types.includes(hospital.type || 'Unknown')) &&
      parseFloat(hospital.distance) <= distance
    );
    setFilteredHospitals(filtered);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-4 text-lg text-gray-800">Filter Hospitals</h3>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Hospital Types:</label>
        <div className="space-y-2">
          {hospitalTypes.map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="mr-2 form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Max Distance: {maxDistance} km</label>
        <input
          type="range"
          min="1"
          max="10"
          value={maxDistance}
          onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

HospitalFilter.propTypes = {
  hospitals: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    distance: PropTypes.string,
  })).isRequired,
  setFilteredHospitals: PropTypes.func.isRequired,
  hospitalTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HospitalFilter;

