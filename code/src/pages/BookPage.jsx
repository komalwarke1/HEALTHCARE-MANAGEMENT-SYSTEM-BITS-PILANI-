import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, Mail, Phone, Heart, CheckCircle } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer1 from '../component/Footer';
import AppointmentScheduler from '../component/Bookappointment';

const BookAppointmentPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const medicalServices = [
    { 
      name: 'General Consultation', 
      icon: <Stethoscope className="w-12 h-12 text-orange-600" />,
      description: 'Comprehensive health assessment and advice',
      color: 'bg-orange-50 hover:bg-orange-100'
    },
    { 
      name: 'Specialist Checkup', 
      icon: <Heart className="w-12 h-12 text-orange-700" />,
      description: 'In-depth consultation with specialized medical experts',
      color: 'bg-orange-50 hover:bg-orange-100'
    },
    { 
      name: 'Preventive Screening', 
      icon: <CheckCircle className="w-12 h-12 text-orange-800" />,
      description: 'Proactive health monitoring and early detection',
      color: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800">
        <Navbar/>

      <main>
         <AppointmentScheduler/>
        <div className=" bg-white rounded-xl shadow-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-orange-900 mb-8">Why Choose MediCare?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
              <Clock className="mx-auto mb-4 w-16 h-16 text-orange-600" />
              <h4 className="font-bold text-xl text-gray-800 mb-2">Flexible Scheduling</h4>
              <p className="text-gray-600">Book appointments at your convenience</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
              <User className="mx-auto mb-4 w-16 h-16 text-orange-600" />
              <h4 className="font-bold text-xl text-gray-800 mb-2">Expert Professionals</h4>
              <p className="text-gray-600">Highly qualified and experienced doctors</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
              <Stethoscope className="mx-auto mb-4 w-16 h-16 text-orange-600" />
              <h4 className="font-bold text-xl text-gray-800 mb-2">Comprehensive Care</h4>
              <p className="text-gray-600">Personalized healthcare solutions</p>
            </div>
          </div>
        </div>
      </main>

      <Footer1/>
    </div>
  );
};

export default BookAppointmentPage;