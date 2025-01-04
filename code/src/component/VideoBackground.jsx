import React from 'react'
import demo from './demo.mp4'

export default function VideoBackground({ 
   
  title = "Welcome to Your Health Journey",
  description = "Discover a healthier, happier you with our expert guidance and support"
}) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video 
        src={demo}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
        <div className="max-w-4xl px-4">
          <h1 className="mb-4 text-5xl font-bold sm:text-6xl md:text-7xl">
            {title}
          </h1>
          
          <p className="mb-8 text-xl sm:text-2xl opacity-90">
            {description}
          </p>
          
          <button className="rounded-full bg-green-600 px-8 py-3 text-base font-medium hover:bg-green-700 sm:text-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}