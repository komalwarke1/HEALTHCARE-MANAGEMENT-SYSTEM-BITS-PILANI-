'use client'

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FiSearch, FiMapPin, FiInfo } from 'react-icons/fi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import Legend from '../map/Legend';
import HospitalFilter from '../map/HospitalFilter';
import HospitalDetails from '../map/HospitalDetails';
import Navbar from '../component/Navbar';

const TOKEN = 'pk.06d39a7eb93b67a1ced90369b4142569';
const SEARCHURL = `https://us1.locationiq.com/v1/search.php?format=json&`;
const NEARBY_URL = `https://us1.locationiq.com/v1/nearby.php?format=json&`;

const LocationIQMap = () => {
  const [data, setData] = useState(null);
  const [position, setPosition] = useState([51.505, -0.09]);
  const [hospitals, setHospitals] = useState([]);
  const [searchingNearby, setSearchingNearby] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5000);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [hospitalTypes, setHospitalTypes] = useState([]);

  useEffect(() => {
    setFilteredHospitals(hospitals);
  }, [hospitals]);

  const isCoordinates = (input) => {
    const parts = input.split(',');
    if (parts.length !== 2) return false;
    const lat = parseFloat(parts[0]);
    const lon = parseFloat(parts[1]);
    return !isNaN(lat) && !isNaN(lon);
  };

  const fetchNearbyHospitals = async (lat, lon) => {
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
  };

  const doSearch = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);
    setSearchingNearby(false);
    const q = document.getElementById('keyword').value.trim();
    if (!q) {
      setError('Please enter a location or coordinates');
      setLoading(false);
      return;
    }
    if (isCoordinates(q)) {
      const [lat, lon] = q.split(',').map(coord => parseFloat(coord));
      setPosition([lat, lon]);
      setData(null);
      setHospitals([]);
    } else {
      const url = `${SEARCHURL}key=${TOKEN}&q=${q}`;
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
  };

  const doReverse = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);
    setSearchingNearby(true);
    const q = document.getElementById('keyword').value.trim();
    if (!q) {
      setError('Please enter a location or coordinates');
      setLoading(false);
      return;
    }
    if (isCoordinates(q)) {
      const [lat, lon] = q.split(',').map(coord => parseFloat(coord));
      setPosition([lat, lon]);
      setData(null);
      await fetchNearbyHospitals(lat, lon);
    } else {
      const url = `${SEARCHURL}key=${TOKEN}&q=${q}`;
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
  };

  const useMyLocation = () => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
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
  };

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

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Find Nearby Hospitals</h1>
          <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder="Enter coordinates or location"
                className="w-full p-3 border-2 border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            <button
              onClick={doSearch}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-center"
            >
              <FiSearch className="mr-2" /> Search
            </button>
            <button
              onClick={doReverse}
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 flex items-center justify-center"
            >
              <FiMapPin className="mr-2" /> Find Hospitals
            </button>
            <button
              onClick={useMyLocation}
              className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 flex items-center justify-center"
            >
              <FiMapPin className="mr-2" /> Use My Location
            </button>
          </div>
          <div className="flex items-center justify-center mb-6">
            <label htmlFor="radius" className="mr-4 text-gray-700">Search Radius (km):</label>
            <input
              type="range"
              id="radius"
              name="radius"
              min="1"
              max="10"
              step="1"
              value={searchRadius / 1000}
              onChange={(e) => setSearchRadius(parseInt(e.target.value) * 1000)}
              className="w-64"
            />
            <span className="ml-4 text-gray-700">{searchRadius / 1000} km</span>
          </div>
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
                <div className="absolute inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              <MapContainer center={position} zoom={13} className="h-full w-full">
                <MapCenter position={position} zoom={13} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {data && (
                  <Marker position={position}>
                    <Popup>{data.display_name}</Popup>
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
                    <Popup>
                      <div>
                        <h3 className="font-bold">{hospital.name || hospital.display_name}</h3>
                        <p>{hospital.address?.road}, {hospital.address?.city}</p>
                        <p>Distance: {hospital.distance} km</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <Legend />
          </div>
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6 overflow-hidden">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Nearby Hospitals</h2>
            <HospitalFilter
              hospitals={hospitals}
              setFilteredHospitals={setFilteredHospitals}
              hospitalTypes={hospitalTypes}
            />
            <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto">
              {filteredHospitals.map((hospital, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold text-lg">{hospital.name || hospital.display_name}</h3>
                  <p className="text-sm text-gray-600">{hospital.address?.road}, {hospital.address?.city}</p>
                  <p className="text-sm text-gray-600">Distance: {hospital.distance} km</p>
                  <button
                    onClick={() => setSelectedHospital(hospital)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedHospital && (
        <HospitalDetails hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />
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

