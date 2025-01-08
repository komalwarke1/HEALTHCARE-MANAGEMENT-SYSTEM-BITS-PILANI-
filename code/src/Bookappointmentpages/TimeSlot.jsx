import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function TimeSlot({ time, isSelected, isAvailable, onSelect }) {
  return (
    <motion.button
      whileHover={{ scale: isAvailable ? 1.02 : 1 }}
      whileTap={{ scale: isAvailable ? 0.98 : 1 }}
      onClick={() => isAvailable && onSelect()}
      disabled={!isAvailable}
      className={`p-4 rounded-xl transition-all flex items-center gap-2 justify-center ${
        isSelected && isAvailable ? "bg-green-600 text-white shadow-inner" :
        !isSelected && isAvailable ? "bg-white hover:bg-green-50 shadow-lg border border-green-100" :
        "bg-gray-100 cursor-not-allowed opacity-50"
      }`}
    >
      <Clock className="w-4 h-4" />
      <span>{time}</span>
    </motion.button>
  );
}
