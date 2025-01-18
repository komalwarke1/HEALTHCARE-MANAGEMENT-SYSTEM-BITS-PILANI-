import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiX, FiNavigation } from 'react-icons/fi';

const SearchBar = ({ onSearch, onNearbySearch, useMyLocation }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleNearbySearch = (e) => {
    e.preventDefault();
    onNearbySearch(query);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto transform transition-all duration-300 hover:scale-[1.01]">
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className={`
          relative flex-grow rounded-xl shadow-lg 
          transition-all duration-300 ease-in-out
          ${isFocused ? 'shadow-blue-200 ring-2 ring-blue-500 ring-opacity-50' : ''}
        `}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter location or coordinates"
            className={`
              w-full pl-12 pr-12 py-4 rounded-xl border-2
              transition-all duration-300 ease-in-out
              placeholder-gray-400 text-gray-700
              focus:outline-none border-transparent bg-white
              hover:bg-gray-50 focus:bg-white
            `}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-gray-600 transition-colors duration-200
                hover:rotate-90 transform p-1 rounded-full hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-6
              bg-gradient-to-r from-blue-500 to-blue-600
              text-white rounded-r-xl
              transition-all duration-300 ease-in-out
              hover:from-blue-600 hover:to-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transform hover:scale-105"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleNearbySearch}
          className="group relative overflow-hidden p-4 bg-gradient-to-r from-green-500 to-emerald-600
            text-white rounded-xl shadow-lg
            transition-all duration-300 ease-in-out
            hover:from-green-600 hover:to-emerald-700
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            transform hover:scale-105"
        >
          <div className="flex items-center justify-center space-x-2">
            <FiMapPin className="w-5 h-5 transform transition-transform group-hover:rotate-12" />
            <span className="font-medium">Find Hospitals</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 
            group-hover:opacity-10 transition-opacity duration-300" />
        </button>

        <button
          onClick={useMyLocation}
          className="group relative overflow-hidden p-4 bg-gradient-to-r from-purple-500 to-indigo-600
            text-white rounded-xl shadow-lg
            transition-all duration-300 ease-in-out
            hover:from-purple-600 hover:to-indigo-700
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            transform hover:scale-105"
        >
          <div className="flex items-center justify-center space-x-2">
            <FiNavigation className="w-5 h-5 transform transition-transform group-hover:rotate-45" />
            <span className="font-medium">Use My Location</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 
            group-hover:opacity-10 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;