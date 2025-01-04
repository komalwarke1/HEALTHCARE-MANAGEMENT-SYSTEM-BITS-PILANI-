import React, { useState } from 'react';
import { 
  FaCalendarAlt, FaClock, FaFileAlt, FaMapPin, 
  FaRegComment, FaFlask, FaUser, FaPhoneAlt, FaEnvelope, FaStar, FaStarHalfAlt, FaRegStar 
} from 'react-icons/fa';

const Patient = ({
  patientData, 
  appointments, 
  reports, 
  addresses, 
  departments,
  timeSlots,
  onRescheduleAppointment,
  onDownloadReport,
  onSubmitFeedback,
  onEditAddress,
  onBookLabTest
}) => {
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');

  const handleFeedbackSubmit = () => {
    onSubmitFeedback({
      rating: feedbackRating,
      comment: feedbackComment
    });
    // Reset form
    setFeedbackRating(0);
    setFeedbackComment('');
  };

  // Helper to render stars based on rating
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-orange-400 cursor-pointer hover:text-orange-500" onClick={() => setFeedbackRating(i)} />);
      } else if (rating > i - 1 && rating < i) {
        stars.push(<FaStarHalfAlt key={i} className="text-orange-300 cursor-pointer hover:text-orange-500" onClick={() => setFeedbackRating(i)} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-orange-200 cursor-pointer hover:text-orange-500" onClick={() => setFeedbackRating(i)} />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <div className="flex items-center space-x-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <FaUser size={48} className="text-orange-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-orange-600">{patientData.name}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <FaEnvelope className="w-4 h-4 mr-2 text-orange-500" />
                {patientData.email}
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="w-4 h-4 mr-2 text-orange-500" />
                {patientData.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-2">
          <button className="tab-trigger text-orange-500 hover:text-orange-600">Appointments</button>
          <button className="tab-trigger text-orange-500 hover:text-orange-600">Reports</button>
          <button className="tab-trigger text-orange-500 hover:text-orange-600">Lab Tests</button>
          <button className="tab-trigger text-orange-500 hover:text-orange-600">Addresses</button>
          <button className="tab-trigger text-orange-500 hover:text-orange-600">Feedback</button>
        </div>

        {/* Appointments Tab */}
        <div className="tab-content">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-orange-600">Your Appointments</h3>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <p className="text-gray-600">No appointments booked yet.</p>
              ) : (
                appointments.map(apt => (
                  <div key={apt.id} className="flex items-center p-4 border rounded-lg">
                    <FaCalendarAlt className="w-6 h-6 mr-4 text-orange-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-orange-600">{apt.doctor}</p>
                      <p className="text-sm text-gray-600">{apt.department}</p>
                      <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                    </div>
                    <button 
                      className="border rounded-lg p-2 text-orange-600 text-sm transition transform hover:bg-orange-600 hover:text-white hover:scale-105"
                      onClick={() => onRescheduleAppointment(apt.id)}
                    >
                      Reschedule
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Reports Tab */}
        <div className="tab-content">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-orange-600">Medical Reports</h3>
            {reports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg mb-4">
                <div className="flex items-center space-x-4">
                  <FaFileAlt className="text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-600">{report.name}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                </div>
                <button 
                  className="border rounded-lg p-2 text-orange-600 text-sm transition transform hover:bg-orange-600 hover:text-white hover:scale-105"
                  onClick={() => onDownloadReport(report.id)}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Addresses Tab */}
        <div className="tab-content">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-orange-600">Manage Addresses</h3>
            {addresses.map(address => (
              <div key={address.id} className="flex items-start space-x-4 p-4 border rounded-lg mb-4">
                <FaMapPin className="text-orange-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-600">{address.type}</h3>
                  <p className="text-gray-600">{address.address}</p>
                </div>
                <button 
                  className="border rounded-lg p-2 text-orange-600 text-sm transition transform hover:bg-orange-600 hover:text-white hover:scale-105"
                  onClick={() => onEditAddress(address.id)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Tab */}
        <div className="tab-content">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-orange-600">Provide Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-orange-600">Rating</label>
                <div className="flex space-x-2">
                  {renderStars(feedbackRating)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-orange-600">Comments</label>
                <textarea
                  className="w-full p-2 border rounded text-gray-600"
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Leave your feedback here..."
                />
              </div>
            </div>
            <button 
              className="w-full mt-6 p-2 bg-orange-600 text-white rounded-lg text-sm transition transform hover:bg-orange-700 hover:scale-105"
              onClick={handleFeedbackSubmit}
              disabled={feedbackRating === 0}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
