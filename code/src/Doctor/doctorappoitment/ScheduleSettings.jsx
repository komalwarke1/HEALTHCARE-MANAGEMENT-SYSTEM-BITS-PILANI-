import React, { useState } from 'react';

const ScheduleSettings = () => {
  const [schedule, setSchedule] = useState({
    Monday: { start: '09:00', end: '17:00' },
    Tuesday: { start: '09:00', end: '17:00' },
    Wednesday: { start: '09:00', end: '17:00' },
    Thursday: { start: '09:00', end: '17:00' },
    Friday: { start: '09:00', end: '17:00' },
    Saturday: { start: '', end: '' },
    Sunday: { start: '', end: '' },
  });

  const handleScheduleChange = (day, field, value) => {
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      [day]: { ...prevSchedule[day], [field]: value }
    }));
  };

  const handleSaveSchedule = () => {
    // Here you would typically send the schedule to your backend
    console.log('Saving schedule:', schedule);
    alert('Schedule saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Set Your Weekly Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(schedule).map(([day, hours]) => (
          <div key={day} className="flex flex-col">
            <h3 className="font-medium text-gray-700 mb-2">{day}</h3>
            <div className="flex space-x-2">
              <input
                type="time"
                value={hours.start}
                onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="text-gray-500 self-center">to</span>
              <input
                type="time"
                value={hours.end}
                onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSaveSchedule}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
      >
        Save Schedule
      </button>
    </div>
  );
};

export default ScheduleSettings;

