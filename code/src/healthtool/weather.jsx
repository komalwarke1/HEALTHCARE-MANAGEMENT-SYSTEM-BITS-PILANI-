import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { MapPin, Wind, AlertCircle, Loader2, ThermometerSun, 
  Droplets, CloudRain, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const API_KEY = 'b758bdcf872ce022e1667a9b7172b72a'; // OpenWeatherMap API key

const MetricCard = ({ icon: Icon, title, value, unit }) => (
  <Card className="bg-green-50 border-green-100">
    <CardContent className="p-6 flex items-center gap-4">
      <div className="p-3 bg-green-100 rounded-lg">
        <Icon className="h-6 w-6 text-green-600" />
      </div>
      <div>
        <p className="text-sm text-green-700">{title}</p>
        <p className="text-2xl font-semibold text-green-900">
          {value}
          {unit && <span className="text-sm font-normal text-green-600 ml-1">{unit}</span>}
        </p>
      </div>
    </CardContent>
  </Card>
);

const PollutantCard = ({ name, value, unit, description }) => (
  <Card className="bg-white border-green-100 hover:shadow-lg transition-all">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-green-900">{name}</h3>
        {value > 50 ? (
          <ArrowUpRight className="h-5 w-5 text-red-500" />
        ) : (
          <ArrowDownRight className="h-5 w-5 text-green-500" />
        )}
      </div>
      <div className="text-3xl font-bold text-green-800 mb-2">
        {value.toFixed(1)}
        <span className="text-sm font-normal text-green-600 ml-1">{unit}</span>
      </div>
      <p className="text-sm text-green-600">{description}</p>
    </CardContent>
  </Card>
);

const AQIDisplay = ({ aqi }) => {
  const getAQIColor = () => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    return 'bg-purple-500';
  };

  const getAQIText = () => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  return (
    <div className={`${getAQIColor()} rounded-xl p-8 text-white`}>
      <div className="text-7xl font-bold mb-2">{aqi}</div>
      <div className="text-2xl">{getAQIText()}</div>
    </div>
  );
};

const AirQualityDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airData, setAirData] = useState(null);

  const fetchLocationName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();
      return `${data[0].name}, ${data[0].country}`;
    } catch (error) {
      return 'Location Unknown';
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return await response.json();
  };

  const fetchAirQuality = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return await response.json();
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const [weather, air, location] = await Promise.all([
              fetchWeatherData(latitude, longitude),
              fetchAirQuality(latitude, longitude),
              fetchLocationName(latitude, longitude)
            ]);

            setLocationName(location);
            setWeatherData({
              temp: Math.round(weather.main.temp),
              humidity: weather.main.humidity,
              windSpeed: weather.wind.speed,
              description: weather.weather[0].description
            });
            setAirData({
              aqi: air.list[0].main.aqi,
              ...air.list[0].components
            });
          } catch (err) {
            setError('Error fetching weather and air quality data');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Unable to retrieve your location. Please allow location access.');
          setLoading(false);
        }
      );
    };

    getUserLocation();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Location Header */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-green-900">{locationName}</h1>
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            icon={ThermometerSun}
            title="Temperature"
            value={weatherData.temp}
            unit="°C"
          />
          <MetricCard
            icon={Droplets}
            title="Humidity"
            value={weatherData.humidity}
            unit="%"
          />
          <MetricCard
            icon={Wind}
            title="Wind Speed"
            value={weatherData.windSpeed}
            unit="m/s"
          />
          <MetricCard
            icon={CloudRain}
            title="Conditions"
            value={weatherData.description}
          />
        </div>

        {/* AQI Display */}
        <Card className="bg-white border-green-100">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-green-900 mb-4">Air Quality Index</h2>
            <AQIDisplay aqi={airData.aqi} />
          </CardContent>
        </Card>

        {/* Pollutants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PollutantCard
            name="PM2.5"
            value={airData.pm2_5}
            unit="µg/m³"
            description="Fine particulate matter that can penetrate deep into lungs"
          />
          <PollutantCard
            name="PM10"
            value={airData.pm10}
            unit="µg/m³"
            description="Coarse particulate matter from dust and pollutants"
          />
          <PollutantCard
            name="NO₂"
            value={airData.no2}
            unit="µg/m³"
            description="Nitrogen dioxide from vehicle emissions"
          />
          <PollutantCard
            name="O₃"
            value={airData.o3}
            unit="µg/m³"
            description="Ground-level ozone formation"
          />
          <PollutantCard
            name="SO₂"
            value={airData.so2}
            unit="µg/m³"
            description="Sulfur dioxide from industrial processes"
          />
          <PollutantCard
            name="CO"
            value={airData.co}
            unit="µg/m³"
            description="Carbon monoxide from incomplete combustion"
          />
        </div>
      </div>
    </div>
  );
};

export default AirQualityDashboard;