import React, { useState } from 'react';
import Calendar from './Calander';
import Label from './Label';
import Input from './Input';
import Button from './Button';


const MonthlyScheduleSettings = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState({});

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleScheduleChange = (field, value) => {
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      [selectedDate.toISOString().split('T')[0]]: {
        ...prevSchedule[selectedDate.toISOString().split('T')[0]],
        [field]: value
      }
    }));
  };

  const handleSaveSchedule = () => {
    // Here you would typically send the schedule to your backend
    console.log('Saving schedule:', schedule);
    alert('Schedule saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Set Your Monthly Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-700 mb-2">
            Set Schedule for {selectedDate.toDateString()}
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={schedule[selectedDate.toISOString().split('T')[0]]?.start || ''}
                onChange={(e) => handleScheduleChange('start', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={schedule[selectedDate.toISOString().split('T')[0]]?.end || ''}
                onChange={(e) => handleScheduleChange('end', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleSaveSchedule} className="mt-6">
        Save Schedule
      </Button>
    </div>
  );
};

export default MonthlyScheduleSettings;

