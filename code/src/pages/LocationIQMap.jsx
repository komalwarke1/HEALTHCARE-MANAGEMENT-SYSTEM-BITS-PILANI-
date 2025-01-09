import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import Navbar from '../component/Navbar'; // Import the Navbar component

const LocationIQMap = () => {
  const TOKEN = 'pk.06d39a7eb93b67a1ced90369b4142569';
  const SEARCHURL = `https://us1.locationiq.com/v1/search.php?format=json&`;
  const NEARBY_URL = `https://us1.locationiq.com/v1/nearby.php?format=json&`;

  const [data, setData] = useState(null);
  const [position, setPosition] = useState([51.505, -0.09]);
  const [hospitals, setHospitals] = useState([]);
  const [searchingNearby, setSearchingNearby] = useState(false);

  const isCoordinates = (input) => {
    const parts = input.split(',');
    if (parts.length !== 2) return false;
    const lat = parseFloat(parts[0]);
    const lon = parseFloat(parts[1]);
    return !isNaN(lat) && !isNaN(lon);
  };

  const fetchNearbyHospitals = async (lat, lon) => {
    const nearbyHospitalsUrl = `${NEARBY_URL}key=${TOKEN}&lat=${lat}&lon=${lon}&tag=hospital&radius=5000`;
    try {
      const nearbyResp = await fetch(nearbyHospitalsUrl);
      if (!nearbyResp.ok) throw new Error(nearbyResp.statusText);
      const nearbyResult = await nearbyResp.json();
      console.log('Nearby Hospitals:', nearbyResult);
      if (Array.isArray(nearbyResult)) {
        setHospitals(nearbyResult);
      } else {
        console.log('No nearby hospitals found');
        setHospitals([]);
      }
    } catch (err) {
      console.error(err);
      setHospitals([]);
    }
  };

  const doSearch = async (ev) => {
    ev.preventDefault();
    console.log('Search Button Clicked');
    const q = document.getElementById('keyword').value.trim();
    setSearchingNearby(false);
    if (!q) {
      console.log('Invalid input');
      return;
    }
    if (isCoordinates(q)) {
      const [lat, lon] = q.split(',').map(coord => parseFloat(coord));
      setPosition([lat, lon]);
      setData(null);  // Clear previous search data
      setHospitals([]);  // Clear previous hospital data
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
        setHospitals([]);  // Clear previous hospital data
      } catch (err) {
        console.error(err);
      }
    }
  };

  const doReverse = async (ev) => {
    ev.preventDefault();
    console.log('Reverse Search Button Clicked');
    const q = document.getElementById('keyword').value.trim();
    setSearchingNearby(true);
    if (!q) {
      console.log('Invalid input');
      return;
    }
    if (isCoordinates(q)) {
      const [lat, lon] = q.split(',').map(coord => parseFloat(coord));
      setPosition([lat, lon]);
      setData(null);  // Clear previous search data
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
      }
    }
  };

  return (
    <div className="relative">
      <Navbar /> {/* Add the Navbar component */}
      <div className="relative z-10 bg-white p-6 shadow-lg w-full">
        <nav className="flex justify-center mb-6">
          <div className="relative w-80">
            <input
              type="text"
              id="keyword"
              name="keyword"
              placeholder="Enter coordinates or location"
              className="w-full p-2 border-2 border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            onClick={doSearch}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 flex items-center"
          >
            <FiSearch className="mr-2" /> Search
          </button>
          <button
            onClick={doReverse}
            className="ml-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 flex items-center"
          >
            <FiMapPin className="mr-2" /> Search Nearby Hospitals
          </button>
        </nav>
      </div>
      <div className="relative z-0 h-96 flex"> {/* Use flexbox */}
        <div className={`w-full ${searchingNearby ? 'w-2/3' : 'w-full'} h-full rounded-lg shadow-lg overflow-hidden`}>
          <MapContainer center={position} zoom={15} className="h-full w-full">
            <MapCenter position={position} zoom={15} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data && (
              <Marker position={position}>
                <Popup>{data.display_name}</Popup>
              </Marker>
            )}
            {Array.isArray(hospitals) && hospitals.map((hospital, index) => (
              <Marker key={index} position={[hospital.lat, hospital.lon]}>
                <Popup>{hospital.display_name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        {searchingNearby && (
          <div className="w-1/3 bg-white p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Nearby Hospitals</h2>
            <ul className="space-y-2">
              {hospitals.map((hospital, index) => (
                <li key={index} className="border-b pb-2">
                  <p className="font-semibold">{hospital.display_name}</p>
                  <p className="text-sm">{hospital.address.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const MapCenter = ({ position, zoom }) => {
  const map = useMap();
  map.setView(position, zoom);
  return null;
};

export default LocationIQMap;
