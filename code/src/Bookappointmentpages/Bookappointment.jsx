import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import ServiceSelection from './ServiceSelection';
import DoctorSelection from './DoctorSelection';
import DateTimeSelection from './DateTimeSelection';
import PatientInformation from './PatientInformation';
import ConfirmationDialog from './ConfirmationDialog';

export default function Bookappointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientInfo, setPatientInfo] = useState({ fullName: '', email: '', phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const handleServiceSelect = (serviceName) => {
    setSelectedService(serviceName);
    setSelectedDoctor(null); // Reset selected doctor when service changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedService || !selectedDoctor) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAppointmentDetails({
        date: selectedDate,
        time: selectedTime,
        service: selectedService,
        patientName: patientInfo.fullName,
        doctorName: selectedDoctor.name,
      });
      setShowConfirmation(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <Stethoscope className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Book Appointment</h1>
              <p className="mt-1 text-green-100">
                Schedule your visit with our healthcare professionals
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <ServiceSelection
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
          />

          {selectedService && (
            <DoctorSelection
              selectedService={selectedService}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
            />
          )}

          <DateTimeSelection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          <PatientInformation
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !selectedDate || !selectedTime || !selectedService || !selectedDoctor}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${
                isSubmitting || !selectedDate || !selectedTime || !selectedService || !selectedDoctor
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </motion.div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        appointmentDetails={appointmentDetails}
      />
    </div>
  );
}

