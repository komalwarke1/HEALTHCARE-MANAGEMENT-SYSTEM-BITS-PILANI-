import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scale, ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BMICalculator = () => {
  const [unit, setUnit] = useState('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let bmiValue;
    if (unit === 'metric') {
      // Metric: weight (kg) / (height (m))²
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      // Imperial: (weight (lbs) * 703) / (height (inches))²
      bmiValue = (parseFloat(weight) * 703) / (parseFloat(height) * parseFloat(height));
    }
    setBmi(Math.round(bmiValue * 10) / 10);
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (bmiValue < 25) return { label: 'Normal weight', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (bmiValue < 30) return { label: 'Overweight', color: 'text-red-600', bgColor: 'bg-red-100' };
    return { label: 'Obese', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const handleBack = () => {
    window.history.back();
  };

  const clearInputs = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <Button 
            onClick={handleBack}
            variant="ghost" 
            className="text-white hover:text-white hover:bg-orange-600/50 mt-6 text-lg group transition-colors duration-200"
            size="lg"
          >
            <ArrowLeft className="h-6 w-6 mr-2 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>
          
          <div className="flex items-center space-x-4 mb-6 mt-8">
            <Scale className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">BMI Calculator</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-2xl pb-16">
            Calculate your Body Mass Index (BMI) to understand your body weight relative to your height
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Calculate Your BMI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Select
                  value={unit}
                  onValueChange={(value) => {
                    setUnit(value);
                    clearInputs();
                  }}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select unit system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (cm/kg)</SelectItem>
                    <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Height ({unit === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <Input
                    type="number"
                    placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <Input
                    type="number"
                    placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={calculateBMI}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={!height || !weight}
                >
                  Calculate BMI
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearInputs}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Clear
                </Button>
              </div>
            </div>

            {bmi !== null && (
              <div className="mt-6 p-6 rounded-lg bg-gray-50">
                <h3 className="text-xl font-semibold mb-4">Your Results</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Your BMI is:</p>
                    <p className="text-3xl font-bold text-orange-600">{bmi}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Category:</p>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getBMICategory(bmi).bgColor} ${getBMICategory(bmi).color}`}>
                      {getBMICategory(bmi).label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Note: BMI is a general indicator and may not be accurate for athletes, elderly, or pregnant women. 
                    Consult a healthcare provider for a complete health assessment.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BMICalculator;