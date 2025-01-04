import React from 'react';
import { User, Calendar, MapPin, Phone, Mail, Shield } from 'lucide-react';

const PatientProfile = ({ 
  name, 
  age, 
  birthdate, 
  address, 
  phone, 
  email, 
  primaryCare, 
  insuranceProvider, 
  allergies = [], 
  medicalHistory = [],
  profileImage = null 
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6 border-b pb-4">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mr-6">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt={`${name}'s profile`} 
              className="w-full h-full rounded-full object-cover" 
            />
          ) : (
            <User size={48} className="text-blue-500" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600">Age: {age} | DOB: {birthdate}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin size={20} className="mr-3 text-blue-500" />
              <span>{address}</span>
            </div>
            <div className="flex items-center">
              <Phone size={20} className="mr-3 text-blue-500" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center">
              <Mail size={20} className="mr-3 text-blue-500" />
              <span>{email}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Medical Details</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <Shield size={20} className="mr-3 text-blue-500" />
              <span>Primary Care: {primaryCare}</span>
            </div>
            <div className="flex items-center">
              <Shield size={20} className="mr-3 text-blue-500" />
              <span>Insurance: {insuranceProvider}</span>
            </div>
          </div>
        </div>
      </div>

      {allergies.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Allergies</h2>
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy, index) => (
              <span 
                key={index} 
                className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}

      {medicalHistory.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Medical History</h2>
          <ul className="space-y-2">
            {medicalHistory.map((history, index) => (
              <li 
                key={index} 
                className="bg-white p-3 rounded shadow-sm flex justify-between"
              >
                <span>{history.condition}</span>
                <span className="text-gray-500">{history.year}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientProfile