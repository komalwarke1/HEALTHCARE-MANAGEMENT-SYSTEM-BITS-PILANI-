import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Sun, Cloud, CloudRain, Thermometer, WormIcon as Virus } from 'lucide-react';

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-10 w-10 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-10 w-10 text-gray-500" />;
    case 'rainy':
      return <CloudRain className="h-10 w-10 text-blue-500" />;
    default:
      return null;
  }
};

export const WeatherAndTrendsCard = () => {
  const [weather, setWeather] = useState({ condition: 'sunny', temperature: 25 });
  const [trendingDisease, setTrendingDisease] = useState('Common Cold');

  useEffect(() => {
    const fetchData = () => {
      const conditions = ['sunny', 'cloudy', 'rainy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemperature = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
      setWeather({ condition: randomCondition, temperature: randomTemperature });

      const diseases = ['Common Cold', 'Flu', 'COVID-19', 'Allergies'];
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setTrendingDisease(randomDisease);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <Sun className="mr-2 text-yellow-500" />
          Weather & Health Trends
        </h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <WeatherIcon condition={weather.condition} />
            <div>
              <span className="text-3xl font-bold text-gray-800">{weather.temperature}°C</span>
              <p className="text-gray-600">{weather.condition}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-6 w-6 text-red-500" />
            <span className="text-sm text-gray-600">Feels like {weather.temperature + 2}°C</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-2">
            <Virus className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-medium text-gray-800">Trending Health Concern</span>
          </div>
          <p className="text-gray-600">{trendingDisease}</p>
        </div>
      </div>
    </Card>
  );
};

