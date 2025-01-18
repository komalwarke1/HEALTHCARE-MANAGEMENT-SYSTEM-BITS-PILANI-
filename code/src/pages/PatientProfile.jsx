import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "../Profilepage/Avatar";
import { Button } from "../Profilepage/Button";
import { Tabs } from '../Profilepage/Tabs';
import { Modal } from "../Profilepage/Modal";
import { EditProfileForm } from "../Profilepage/EditProfileForm";
import { PersonalInfoCard } from "../Profilepage/PersonalInfoCard";
import { HealthStatusCard } from "../Profilepage/HealthStatusCard";
import { AppointmentCard } from "../Profilepage/AppointmentCard";
import { WeatherAndTrendsCard } from "../Profilepage/WeatherAndTrendsCard";
import { Badge } from "../Profilepage/Badge";
import { Calendar, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { Appointments } from "../Profilepage/Appointment";
import { MedicalRecords } from "../Profilepage/MedicalRecords";
import Navbar from "../component/Navbar";
import { useProfile } from "../ProfileProvider";
import LoadingPage from "./LoadingPage";


const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 
  const [loading, setLoading] = useState(true);
  const { patientInfo, isLoading, error, updateProfile } = useProfile();
  console.log(patientInfo);

  if (isLoading) {
    return <LoadingPage/>;
  }

  if (!patientInfo) {
    return <div>{error}</div>;
  }


  const tabContent = {
    overview: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <PersonalInfoCard {...patientInfo} />
        <HealthStatusCard
          bloodPressure="120/80"
          bmi={24.5}
          bloodSugar="95 mg/dL"
        />
        <AppointmentCard
          doctor="Dr. Smith"
          specialty="Cardiology"
          date="March 15, 2025"
          time="10:30 AM"
        />
        <WeatherAndTrendsCard />
      </motion.div>
    ),
    "medical-records": (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <MedicalRecords/>
      </motion.div>
    ),
    appointments: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Appointments/>
      </motion.div>
    ),
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg">
        <Navbar/>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar
                src={patientInfo.photoURL}
                alt={patientInfo.firstName}
                fallback={patientInfo.firstName}
                className="h-24 w-24 rounded-full border-4 border-blue-500"
                
              />
              <div className="text-center md:text-left">
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-gray-800">{patientInfo.firstName+" "+patientInfo.lastName}</h1>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    Patient
                  </Badge>
                </div>
                <div className="mt-2 space-y-1">
                  
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {patientInfo.email}
                  </p>
                  
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end space-y-2">
              <Button onClick={() => setIsEditModalOpen(true)}>
                Edit Profile
              </Button>
              
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { id: 'overview', label: 'Overview' },
            
            { id: 'appointments', label: 'Appointments' },
            { id: 'medical-records', label: 'Medical Records' },
          ]}
        />

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {tabContent[activeTab]}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-white shadow-lg mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2025 Hospital Management System
          </p>
        </div>
      </footer>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditProfileForm onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default PatientProfile;

