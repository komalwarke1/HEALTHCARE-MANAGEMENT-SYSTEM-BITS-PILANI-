import React from 'react';
import { FiX, FiPhone, FiGlobe, FiMapPin, FiInfo, FiNavigation } from 'react-icons/fi';

const HospitalDetails = ({ hospital, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-2000">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors">
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{hospital.name || hospital.display_name}</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <FiMapPin className="mr-2 mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">
              <strong>Address:</strong><br />
              {hospital.address?.road}, {hospital.address?.city}, {hospital.address?.state} {hospital.address?.postcode}
            </p>
          </div>
          <p className="flex items-center text-gray-700">
            <FiInfo className="mr-2 text-gray-500 flex-shrink-0" />
            <strong>Type:</strong> {hospital.type || 'Not specified'}
          </p>
          <p className="flex items-center text-gray-700">
            <FiNavigation className="mr-2 text-gray-500 flex-shrink-0" />
            <strong>Distance:</strong> {hospital.distance} km
          </p>
          {hospital.phone && (
            <p className="flex items-center">
              <FiPhone className="mr-2 text-gray-500 flex-shrink-0" />
              <a href={`tel:${hospital.phone}`} className="text-blue-500 hover:underline">{hospital.phone}</a>
            </p>
          )}
          {hospital.website && (
            <p className="flex items-center">
              <FiGlobe className="mr-2 text-gray-500 flex-shrink-0" />
              <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{hospital.website}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;

