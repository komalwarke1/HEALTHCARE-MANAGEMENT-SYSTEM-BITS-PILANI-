import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Tabs } from './Tabs';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

const AppointmentCard = ({ date, time, doctor, specialty, location, isPast }) => (
  <Card className="mb-4">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">{doctor}</h4>
          <p className="text-gray-600">{specialty}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${isPast ? 'bg-gray-200 text-gray-700' : 'bg-green-200 text-green-800'}`}>
          {isPast ? 'Past' : 'Upcoming'}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="mr-2 h-5 w-5" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="mr-2 h-5 w-5" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="mr-2 h-5 w-5" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  </Card>
);

const AppointmentList = ({ appointments }) => (
  <AnimatePresence>
    {appointments.map((appointment, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <AppointmentCard {...appointment} />
      </motion.div>
    ))}
  </AnimatePresence>
);

export const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingAppointments = [
    {
      date: 'May 15, 2025',
      time: '10:00 AM',
      doctor: 'Dr. Emily Johnson',
      specialty: 'Cardiology',
      location: 'Heart Health Clinic, Room 305',
      isPast: false,
    },
    {
      date: 'June 2, 2025',
      time: '2:30 PM',
      doctor: 'Dr. Michael Lee',
      specialty: 'Orthopedics',
      location: 'Bone & Joint Center, Room 210',
      isPast: false,
    },
  ];

  const pastAppointments = [
    {
      date: 'April 10, 2025',
      time: '11:15 AM',
      doctor: 'Dr. Sarah Thompson',
      specialty: 'General Practice',
      location: 'Family Health Clinic, Room 102',
      isPast: true,
    },
    {
      date: 'March 22, 2025',
      time: '3:45 PM',
      doctor: 'Dr. David Rodriguez',
      specialty: 'Dermatology',
      location: 'Skin Care Center, Room 405',
      isPast: true,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Appointments</h2>
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Past' },
        ]}
      />
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AppointmentList appointments={upcomingAppointments} />
            </motion.div>
          )}
          {activeTab === 'past' && (
            <motion.div
              key="past"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AppointmentList appointments={pastAppointments} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

