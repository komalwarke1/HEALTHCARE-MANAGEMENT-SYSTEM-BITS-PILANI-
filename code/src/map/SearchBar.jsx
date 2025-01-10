import React, { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

const SearchBar = ({ onSearch, useMyLocation }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location"
          className="w-64 px-4 py-2 rounded-l-full border-r-0 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 bg-white rounded-r-full border-2 border-l-0 border-gray-300 hover:bg-gray-100"
        >
          <FiSearch className="text-gray-600" />
        </button>
      </div>
      <button
        type="button"
        onClick={useMyLocation}
        className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FiMapPin />
      </button>
    </form>
  );
};

export default SearchBar;

