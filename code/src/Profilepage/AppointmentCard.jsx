import React from 'react';
import { Card } from './Card';
import { Calendar, Clock, User } from 'lucide-react';

export const AppointmentCard = ({ doctor, specialty, date, time }) => (
  <Card>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Calendar className="mr-2 text-indigo-500" />
        Upcoming Appointment
      </h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <User className="mr-2 text-gray-500" size={16} />
          <span className="text-gray-800 font-medium">{doctor}</span>
        </div>
        <div className="text-gray-600">{specialty}</div>
        <div className="flex items-center">
          <Calendar className="mr-2 text-gray-500" size={16} />
          <span className="text-gray-800">{date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 text-gray-500" size={16} />
          <span className="text-gray-800">{time}</span>
        </div>
      </div>
    </div>
  </Card>
);

