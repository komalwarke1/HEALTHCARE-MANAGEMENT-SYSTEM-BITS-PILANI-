import React from 'react';
import { Card } from './Card';
import { Heart, Activity, Thermometer } from 'lucide-react';

export const HealthStatusCard = ({ bloodPressure, bmi, bloodSugar }) => (
  <Card>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Activity className="mr-2 text-green-500" />
        Health Status
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <Heart className="mr-1 text-red-500" size={16} />
            Blood Pressure
          </span>
          <span className="font-medium text-gray-800">{bloodPressure}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">BMI</span>
          <span className="font-medium text-gray-800">{bmi}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <Thermometer className="mr-1 text-blue-500" size={16} />
            Blood Sugar
          </span>
          <span className="font-medium text-gray-800">{bloodSugar}</span>
        </div>
      </div>
    </div>
  </Card>
);

