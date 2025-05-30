import React from 'react';
import videoBg from '../assets/amy.mp4'; // Adjust path as needed

const VideoBackground = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
        <h1 className="text-4xl lg:text-7xl font-extrabold animate-fade-in-up mb-6">
          Welcome to AmyAfrique
        </h1>
        <button className="bg-white text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-black hover:text-white transition duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default VideoBackground;
