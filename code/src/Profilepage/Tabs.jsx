import React from 'react';
import { motion } from 'framer-motion';

export const Tabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="relative">
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative rounded-md py-2 px-4 text-sm font-medium transition-colors duration-200
              ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-500 rounded-md"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

