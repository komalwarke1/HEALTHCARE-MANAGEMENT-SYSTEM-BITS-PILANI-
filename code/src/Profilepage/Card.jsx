import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

