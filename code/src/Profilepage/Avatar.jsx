import React from 'react';

export const Avatar = ({ src, alt, fallback, className }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="rounded-full" />
      ) : (
        <div className="bg-gray-200 rounded-full flex items-center justify-center text-gray-300 font-semibold">
          {fallback}
        </div>
      )}
    </div>
  );
};

