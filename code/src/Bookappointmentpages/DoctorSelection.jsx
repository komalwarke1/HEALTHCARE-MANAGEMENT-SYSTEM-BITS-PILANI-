import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const doctors = [
  { id: 1, name: "Dr. John Doe", specialties: ["General Checkup", "Vaccination"], rating: 4.8, address: "123 Main St, Anytown, USA" },
  { id: 2, name: "Dr. Jane Smith", specialties: ["Cardiology", "General Checkup"], rating: 4.9, address: "456 Oak Ave, Somewhere, USA" },
  { id: 3, name: "Dr. Mike Johnson", specialties: ["Pediatrics","Vaccination"], rating: 4.7, address: "789 Pine Rd, Elsewhere, USA" },
  { id: 4, name: "Dr. Sarah Brown", specialties: ["Dental", "General Checkup"], rating: 4.6, address: "321 Elm St, Nowhere, USA" },
  { id: 5, name: "Dr. David Lee", specialties: ["Laboratory", "Cardiology"], rating: 4.8, address: "654 Birch Ln, Anyplace, USA" },
];

export default function DoctorSelection({ selectedService, selectedDoctor, setSelectedDoctor }) {
  const availableDoctors = doctors.filter(doctor => 
    doctor.specialties.includes(selectedService)
  );

   return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Select Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableDoctors.map((doctor, index) => (
          <motion.button
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedDoctor(doctor)}
            className={`p-4 rounded-xl transition-all text-left ${
              selectedDoctor && selectedDoctor.id === doctor.id
                ? "bg-green-600 text-white shadow-inner"
                : "bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl"
            }`}
          >
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm mt-1">Specialties: {doctor.specialties.join(", ")}</p>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span className="ml-1">{doctor.rating ? doctor.rating.toFixed(1) : 'N/A'}</span>
            </div>
            <p className="text-sm mt-2">{doctor.address}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

