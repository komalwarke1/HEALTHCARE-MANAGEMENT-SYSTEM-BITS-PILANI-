import React, { useState, useEffect } from 'react';
import AppointmentItem from './AppointmentItem';
import SortingControls from './SortingControls';

const fetchAppointments = async () => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', patientName: 'John Doe', date: '2023-05-15', time: '09:00', reason: 'Annual checkup', status: 'Confirmed' },
        { id: '2', patientName: 'Jane Smith', date: '2023-05-15', time: '10:30', reason: 'Follow-up', status: 'Pending' },
        { id: '3', patientName: 'Bob Johnson', date: '2023-05-16', time: '14:00', reason: 'New patient consultation', status: 'Confirmed' },
        { id: '4', patientName: 'Alice Brown', date: '2023-05-16', time: '11:15', reason: 'Prescription renewal', status: 'Confirmed' },
        { id: '5', patientName: 'Charlie Davis', date: '2023-05-17', time: '13:45', reason: 'Lab results discussion', status: 'Pending' },
      ]);
    }, 1000);
  });
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      setIsLoading(true);
      const fetchedAppointments = await fetchAppointments();
      setAppointments(fetchedAppointments);
      setIsLoading(false);
    };
    getAppointments();
  }, []);

  const sortAppointments = (field) => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setAppointments(sortedAppointments);
  };

  useEffect(() => {
    sortAppointments(sortField);
  }, [sortField]);

  const handleSortChange = (field) => {
    setSortField(field);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <SortingControls onSortChange={handleSortChange} sortField={sortField} />
      {appointments.map((appointment) => (
        <AppointmentItem key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default AppointmentList;

