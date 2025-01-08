import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';

const LocationIQMap = () => {
  const TOKEN = 'pk.06d39a7eb93b67a1ced90369b4142569';
  const SEARCHURL = `https://us1.locationiq.com/v1/search.php?format=json&`;
  const REVERSEURL = `https://us1.locationiq.com/v1/reverse.php?format=json&`;

  const [data, setData] = useState(null);
  const [position, setPosition] = useState([51.505, -0.09]);

  const doSearch = async (ev) => {
    ev.preventDefault();
    const q = document.getElementById('keyword').value.trim();
    if (!q) return false;
    const url = `${SEARCHURL}key=${TOKEN}&q=${q}`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(resp.statusText);
      const result = await resp.json();
      console.log('Search Result:', result[0]);
      setData(result[0]);
      setPosition([result[0].lat, result[0].lon]);
    } catch (err) {
      console.error(err);
    }
  };

  const doReverse = async (ev) => {
    ev.preventDefault();
    const q = document.getElementById('keyword').value.trim();
    if (!q || q.indexOf(',') < 0) return false;
    const parts = q.split(',');
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return false;
    const url = `${REVERSEURL}key=${TOKEN}&lat=${parts[0]}&lon=${parts[1]}`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(resp.statusText);
      const result = await resp.json();
      console.log('Reverse Search Result:', result);
      setData(result);
      setPosition([result.lat, result.lon]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-semibold text-orange-600">Hospital Locator</h1>
        <p className="text-lg text-blue-700">Effortlessly find hospitals near you</p>
      </header>
      <section className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-orange-600">Search for Hospitals</h2>
        <p className="text-gray-700">Enter the hospital's name or address below.</p>
      </section>
      <nav className="flex justify-center mb-6">
        <div className="relative w-80">
          <input
            type="text"
            id="keyword"
            name="keyword"
            placeholder="Enter hospital name or address"
            className="w-full p-2 border-2 border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button
          onClick={doSearch}
          className="ml-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 flex items-center"
        >
          <FiSearch className="mr-2" /> Search
        </button>
        <button
          onClick={doReverse}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center"
        >
          <FiMapPin className="mr-2" /> Reverse Search
        </button>
      </nav>
      <main>
        <section className="map">
          <MapContainer center={position} zoom={15} style={{ height: "600px", width: "100%" }} className="rounded-lg shadow-lg">
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
          </MapContainer>
        </section>
      </main>
      <footer className="text-center mt-6">
        <h3 className="text-lg font-semibold text-orange-600">Contact Information</h3>
        <p className="text-gray-700">123 Main Street, City, Country</p>
        <p className="text-gray-700">Phone: (123) 456-7890</p>
        <p className="text-gray-700">Email: info@hospitallocator.com</p>
      </footer>
    </div>
  );
};

const MapCenter = ({ position, zoom }) => {
  const map = useMap();
  map.setView(position, zoom);
  return null;
};

export default LocationIQMap;
