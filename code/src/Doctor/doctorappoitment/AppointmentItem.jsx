import React from 'react';
import { Calendar, Clock, UserIcon } from 'lucide-react';

const AppointmentItem = ({ appointment }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">{appointment.patientName}</h3>
          <div className="flex items-center text-gray-600 mb-1">
            <Calendar className="h-5 w-5 mr-2 text-green-500" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-1">
            <Clock className="h-5 w-5 mr-2 text-green-500" />
            <span>{appointment.time}</span>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {appointment.status}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700 mb-1">Reason for Visit:</h4>
        <p className="text-gray-600">{appointment.reason}</p>
      </div>
    </div>
  );
};

export default AppointmentItem;

