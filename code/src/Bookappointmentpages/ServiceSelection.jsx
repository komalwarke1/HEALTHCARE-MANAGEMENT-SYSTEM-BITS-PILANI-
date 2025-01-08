import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard'

const services = [
  { id: 1, name: "General Checkup", icon: "🏥", description: "Complete health examination" },
  { id: 2, name: "Vaccination", icon: "💉", description: "Immunization services" },
  { id: 3, name: "Laboratory", icon: "🔬", description: "Blood tests & diagnostics" },
  { id: 4, name: "Cardiology", icon: "❤️", description: "Heart health services" },
  { id: 5, name: "Dental", icon: "🦷", description: "Dental care & cleaning" },
  { id: 6, name: "Pediatrics", icon: "👶", description: "Children's healthcare" },
];

export default function ServiceSelection({ selectedService, onServiceSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold text-green-800">Select Service</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            {...service}
            isSelected={selectedService === service.name}
            onSelect={() => onServiceSelect(service.name)}
          />
        ))}
      </div>
    </motion.div>
  );
}