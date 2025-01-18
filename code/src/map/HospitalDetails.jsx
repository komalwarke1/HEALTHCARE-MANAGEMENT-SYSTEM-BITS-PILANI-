import React from 'react';
import { FiX, FiPhone, FiGlobe, FiMapPin, FiInfo, FiNavigation } from 'react-icons/fi';

const HospitalDetails = ({ hospital, onClose, onRoute }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div 
        className="bg-white rounded-xl p-8 max-w-md w-full m-4 relative shadow-2xl animate-slideUp
          transform transition-all duration-300 ease-in-out"
      >
        {/* Close button with hover effect */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 
            transition-all duration-300 p-2 rounded-full hover:bg-gray-100"
        >
          <FiX size={24} />
        </button>

        {/* Header with gradient underline */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 pb-2">{hospital.name || hospital.display_name}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
        </div>

        {/* Content with hover effects */}
        <div className="space-y-4">
          {/* Address Card */}
          <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
            <div className="flex items-start">
              <FiMapPin className="mr-3 mt-1 text-blue-500 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-gray-700 mb-1">Address</p>
                <p className="text-gray-600">
                  {hospital.address?.road}, {hospital.address?.city},<br />
                  {hospital.address?.state} {hospital.address?.postcode}
                </p>
              </div>
            </div>
          </div>

          {/* Type and Distance Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="flex items-center">
                <FiInfo className="mr-2 text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-700">Type</p>
                  <p className="text-gray-600">{hospital.type || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="flex items-center">
                <FiNavigation className="mr-2 text-purple-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-700">Distance</p>
                  <p className="text-gray-600">{hospital.distance} km</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {hospital.phone && (
            <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="flex items-center">
                <FiPhone className="mr-3 text-orange-500 flex-shrink-0" size={20} />
                <a 
                  href={`tel:${hospital.phone}`} 
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                >
                  {hospital.phone}
                </a>
              </div>
            </div>
          )}

          {hospital.website && (
            <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="flex items-center">
                <FiGlobe className="mr-3 text-blue-500 flex-shrink-0" size={20} />
                <a 
                  href={hospital.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300 truncate"
                >
                  {hospital.website}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => onRoute(hospital)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg
              hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
          >
            <div className="flex items-center space-x-2">
              <FiNavigation size={18} />
              <span>Get Directions</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;