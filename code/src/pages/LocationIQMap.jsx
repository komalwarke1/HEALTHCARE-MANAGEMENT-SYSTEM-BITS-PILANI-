'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FiSearch, FiMapPin, FiInfo,FiUser } from 'react-icons/fi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import Legend from '../map/Legend';
import HospitalFilter from '../map/HospitalFilter';
import HospitalDetails from '../map/HospitalDetails';
import Navbar from '../component/Navbar';
import RoutingMachine from '../map/RoutingMachine';
import SearchBar from '../map/SearchBar';
import RouteGuide from '../map/RouteGuide';

const mapStyles = `
  .leaflet-popup {
    z-index: 1000 !important;
  }
  .leaflet-popup-content-wrapper {
    z-index: 1000 !important;
  }
  .leaflet-popup-tip-container {
    z-index: 1000 !important;
  }
  .custom-icon {
    z-index: 900 !important;
  }
`;

const TOKEN = 'pk.06d39a7eb93b67a1ced90369b4142569';
const SEARCHURL = `https://us1.locationiq.com/v1/search.php?format=json&`;
const NEARBY_URL = `https://us1.locationiq.com/v1/nearby.php?format=json&`;

const LocationIQMap = () => {
  const [data, setData] = useState(null);
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [searchingNearby, setSearchingNearby] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5000);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [hospitalTypes, setHospitalTypes] = useState([]);
  const [routeStart, setRouteStart] = useState(null);
  const [routeEnd, setRouteEnd] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeSteps, setRouteSteps] = useState([]);

  useEffect(() => {
    setFilteredHospitals(hospitals);
  }, [hospitals]);

  useEffect(() => {
    // Add the styles to the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = mapStyles;
    document.head.appendChild(styleElement);

    // Set default location to user's location
    useMyLocation();

    // Cleanup function to remove styles when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const isCoordinates = (input) => {
    const parts = input.split(',');
    if (parts.length !== 2) return false;
    const lat = parseFloat(parts[0]);
    const lon = parseFloat(parts[1]);
    return !isNaN(lat) && !isNaN(lon);
  };

  const fetchNearbyHospitals = useCallback(async (lat, lon) => {
    const nearbyHospitalsUrl = `${NEARBY_URL}key=${TOKEN}&lat=${lat}&lon=${lon}&tag=hospital&radius=${searchRadius}`;
    try {
      const nearbyResp = await fetch(nearbyHospitalsUrl);
      if (!nearbyResp.ok) throw new Error(nearbyResp.statusText);
      const nearbyResult = await nearbyResp.json();
      console.log('Nearby Hospitals:', nearbyResult);
      if (Array.isArray(nearbyResult)) {
        const hospitalsWithDistance = nearbyResult.map((hospital) => ({
          ...hospital,
          distance: calculateDistance(lat, lon, parseFloat(hospital.lat), parseFloat(hospital.lon)),
        }));
        setHospitals(hospitalsWithDistance);
        const types = [...new Set(hospitalsWithDistance.map(h => h.type || 'Unknown'))];
        setHospitalTypes(types);
      } else {
        console.log('No nearby hospitals found');
        setHospitals([]);
        setHospitalTypes([]);
      }
    } catch (err) {
      console.error(err);
      setHospitals([]);
      setHospitalTypes([]);
      setError('Failed to fetch nearby hospitals. Please try again.');
    }
  }, [searchRadius]);

  const handleSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setSearchingNearby(false);

    if (!query) {
      setError('Please enter a location or coordinates');
      setLoading(false);
      return;
    }

    if (isCoordinates(query)) {
      const [lat, lon] = query.split(',').map(coord => parseFloat(coord));
      setPosition([lat, lon]);
      setData(null);
      setHospitals([]);
    } else {
      const url = `${SEARCHURL}key=${TOKEN}&q=${query}`;
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(resp.statusText);
        const result = await resp.json();
        console.log('Search Result:', result[0]);
        const lat = parseFloat(result[0].lat);
        const lon = parseFloat(result[0].lon);
        setData(result[0]);
        setPosition([lat, lon]);
        setHospitals([]);
      } catch (err) {
        console.error(err);
        setError('Failed to find location. Please try again.');
      }
    }
    setLoading(false);
  }, []);

  const handleNearbySearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setSearchingNearby(true);

    if (!query) {
      setError('Please enter a location or coordinates');
      setLoading(false);
      return;
    }

    if (isCoordinates(query)) {
      const [lat, lon] = query.split(',').map(coord => parseFloat(coord));
      setPosition([lat, lon]);
      setData(null);
      await fetchNearbyHospitals(lat, lon);
    } else {
      const url = `${SEARCHURL}key=${TOKEN}&q=${query}`;
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(resp.statusText);
        const result = await resp.json();
        console.log('Search Result:', result[0]);
        const lat = parseFloat(result[0].lat);
        const lon = parseFloat(result[0].lon);
        setData(result[0]);
        setPosition([lat, lon]);
        await fetchNearbyHospitals(lat, lon);
      } catch (err) {
        console.error(err);
        setError('Failed to find location. Please try again.');
      }
    }
    setLoading(false);
  }, [fetchNearbyHospitals]);

  const useMyLocation = useCallback(() => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setUserLocation([latitude, longitude]);
          setData(null);
          setSearchingNearby(true);
          await fetchNearbyHospitals(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Failed to get your location. Please try entering it manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please enter your location manually.');
      setLoading(false);
    }
  }, [fetchNearbyHospitals]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };

  const handleRouteToHospital = (hospital) => {
    if (position && hospital) {
      setRouteStart(position);
      setRouteEnd([parseFloat(hospital.lat), parseFloat(hospital.lon)]);
    }
  };


  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Find Nearby Hospitals</h1>
          <SearchBar
            onSearch={handleSearch}
            onNearbySearch={handleNearbySearch}
            useMyLocation={useMyLocation}
          />
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[600px] relative">
              {loading && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center z-[1100]">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              {position && (
                <MapContainer 
                  center={position} 
                  zoom={13} 
                  className="h-full w-full"
                  style={{ zIndex: 0 }}
                >
                  <MapCenter position={position} zoom={13} />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {data && (
                    <Marker 
                      position={position}
                      icon={L.divIcon({
                        className: 'custom-icon',
                        html: `<div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                          <FiMapPin />
                        </div>`,
                      })}
                    >
                      <Popup className="z-[1000]">{data.display_name}</Popup>
                    </Marker>
                  )}
                  {userLocation && (
                    <Marker 
                      position={userLocation}
                      icon={L.divIcon({
                        className: 'custom-icon',
                        html: `<div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                          <FiUser />
                        </div>`,
                      })}
                    >
                      <Popup className="z-[1000]">Your Location</Popup>
                    </Marker>
                  )}
                  {filteredHospitals.map((hospital, index) => (
                    <Marker
                      key={index}
                      position={[parseFloat(hospital.lat), parseFloat(hospital.lon)]}
                      icon={L.divIcon({
                        className: 'custom-icon',
                        html: `<div class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">${index + 1}</div>`,
                      })}
                    >
                      <Popup className="z-[1000]">
                        <div>
                          <h3 className="font-bold">{hospital.name || hospital.display_name}</h3>
                          <p>{hospital.address?.road}, {hospital.address?.city}</p>
                          <p>Distance: {hospital.distance} km</p>
                          <button
                            onClick={() => handleRouteToHospital(hospital)}
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            Get Directions
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  {routeStart && routeEnd && (
                    <RoutingMachine start={routeStart} end={routeEnd} setRouteSteps={setRouteSteps} />
                  )}
                </MapContainer>
              )}
              {routeStart && routeEnd && (
                <button
                  onClick={() => {
                    setRouteStart(null);
                    setRouteEnd(null);
                  }}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 z-[1000]"
                >
                  Clear Route
                </button>
              )}
            </div>
            <Legend/>
          </div>
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6 overflow-hidden">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Nearby Hospitals</h2>
            <HospitalFilter
              hospitals={hospitals}
              setFilteredHospitals={setFilteredHospitals}
              hospitalTypes={hospitalTypes}
            />
            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            {!loading && filteredHospitals.length === 0 && (
              <div className="text-center text-gray-600 py-8">
                No hospitals found in this area. Try increasing the search radius or searching in a different location.
              </div>
            )}
            <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto">
              {filteredHospitals.map((hospital, index) =>(
                
                <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-lg text-gray-800">{hospital.name || hospital.display_name}</h3>
                  <p className="text-sm text-gray-600">{hospital.address?.road}, {hospital.address?.city}</p>
                  <p className="text-sm text-gray-600">Distance: {hospital.distance} km</p>
                  <button
                    onClick={() => setSelectedHospital(hospital)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View Details
                  </button>
                  <div className="mt-2 flex justify-between">
                    
                    <button
                      onClick={() => handleRouteToHospital(hospital)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
                
              ))}
              {routeSteps.length > 0 && (
                <div className="mt-4">
                  <RouteGuide steps={routeSteps} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedHospital && (
        <HospitalDetails 
          hospital={selectedHospital} 
          onClose={() => setSelectedHospital(null)} 
          onRoute={() => handleRouteToHospital(selectedHospital)}
        />
      )}
    </div>
  );
};

const MapCenter = ({ position, zoom }) => {
  const map = useMap();
  map.setView(position, zoom);
  return null;
};

MapCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

export default LocationIQMap;

