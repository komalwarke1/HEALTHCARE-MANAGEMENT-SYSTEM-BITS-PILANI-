import React from 'react';

const Box = ({ text, text2, imageUrl }) => {
  return (
    <div className="h-[350px] w-[300px] border-2 border-gray-200 rounded-2xl shadow-lg bg-white p-5 transition-transform transform hover:scale-105">
      {/* Image Section */}
      <div className="flex justify-center items-center bg-gray-200 rounded-xl p-4">
        <img
          className="h-[150px] object-contain"
          src={imageUrl}
          alt="Feature Icon"
        />
      </div>

      {/* Content Section */}
      <div className="italic text-lg font-semibold text-gray-700 mt-5 text-center">
        {text}
      </div>
      <div className="mt-2 text-center text-gray-500">
        Connect Within <span className="font-bold text-blue-600">{text2}</span>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-5">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Box;
