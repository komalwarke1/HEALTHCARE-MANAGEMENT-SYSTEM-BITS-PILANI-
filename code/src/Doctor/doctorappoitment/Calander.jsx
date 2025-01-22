import React from 'react';

const Calendar = ({ mode, selected, onSelect, className }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  // Get first day of month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  // Helper to check if a date is selected
  const isSelected = (date) => {
    if (!selected) return false;
    return date.toDateString() === selected.toDateString();
  };

  // Helper to check if a date is disabled
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate date 7 days from now
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    // Disable if date is in the past OR within the next 7 days
    return date < futureDate;
  };
  
  // Generate calendar days
  const generateDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="p-2"></td>);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      
      days.push(
        <td key={day} className="p-2">
          <button
            onClick={() => !isDisabled && onSelect(date)}
            disabled={isDisabled}
            className={`w-8 h-8 rounded-md ${
              isSelected(date)
                ? 'bg-green-600 text-white'
                : isDisabled
                ? 'text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            {day}
          </button>
        </td>
      );
    }
    
    return days;
  };
  
  // Group days into weeks
  const groupIntoWeeks = (days) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={i}>{days.slice(i, i + 7)}</tr>);
    }
    return weeks;
  };
  
  // Handle month navigation
  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    // Only allow navigating to months that have selectable dates
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    if (newDate.getMonth() >= futureDate.getMonth() || 
        newDate.getFullYear() > futureDate.getFullYear()) {
      setCurrentMonth(newDate);
    }
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Check if prev month button should be disabled
  const isPrevMonthDisabled = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    return (
      currentMonth.getMonth() === futureDate.getMonth() &&
      currentMonth.getFullYear() === futureDate.getFullYear()
    );
  };
  
  return (
    <div className={`p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          disabled={isPrevMonthDisabled()}
          className={`p-2 rounded-full ${
            isPrevMonthDisabled()
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          ←
        </button>
        <h2 className="font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <th key={day} className="p-2 text-gray-500 font-medium">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{groupIntoWeeks(generateDays())}</tbody>
      </table>
    </div>
  );
};

export default Calendar;