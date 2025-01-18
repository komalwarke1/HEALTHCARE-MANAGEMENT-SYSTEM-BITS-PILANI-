import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-bold mb-6 text-xl text-gray-800 border-b pb-3"
      >
        Filter Hospitals
      </motion.h3>

      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <label className="block mb-3 font-semibold text-gray-700">Hospital Types</label>
          <div className="grid grid-cols-2 gap-3">
            {hospitalTypes.map(type => (
              <motion.label
                key={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{type}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between mb-2">
            <label className="font-semibold text-gray-700">Maximum Distance</label>
            <span className="text-blue-600 font-semibold">{maxDistance} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={maxDistance}
            onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-1 text-sm text-gray-500">
            <span>1 km</span>
            <span>10 km</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
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