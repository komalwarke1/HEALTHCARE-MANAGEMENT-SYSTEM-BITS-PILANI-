import React, { useState } from 'react';
import Header from './doctorappoitment/Header';
import AppointmentList from './doctorappoitment/AppointmentList';
import MonthlyScheduleSettings from './doctorappoitment/MonthlyScheduleSettings';

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState('appointments');

  const handleSetScheduleClick = () => {
    setActiveTab('schedule');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSetScheduleClick={handleSetScheduleClick} />
      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex border-b mb-4">
            <button
              className={`py-2 px-4 focus:outline-none ${
                activeTab === 'appointments'
                  ? 'border-b-2 border-green-500 text-green-500'
                  : 'text-gray-500 hover:text-green-500'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button
              className={`py-2 px-4 focus:outline-none ${
                activeTab === 'schedule'
                  ? 'border-b-2 border-green-500 text-green-500'
                  : 'text-gray-500 hover:text-green-500'
              }`}
              onClick={() => setActiveTab('schedule')}
            >
              Set Schedule
            </button>
          </div>
          {activeTab === 'appointments' && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Appointments</h2>
              <p className="text-gray-600 mb-4">
                Here's an overview of your upcoming appointments. You can sort them by date, time, or patient name.
              </p>
            </>
          )}
        </div>
        {activeTab === 'appointments' ? <AppointmentList /> : <MonthlyScheduleSettings />}
      </main>
    </div>
  );
};

export default DoctorAppointments;

