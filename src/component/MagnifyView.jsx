import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5"; // Import close icon (npm install react-icons)
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"; // Import zoom styles

const MagnifyView = ({ image, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling when magnifier is open
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4">
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 text-white text-3xl bg-gray-700 hover:bg-gray-800 p-2 rounded-full transition"
        onClick={onClose}
      >
        <IoClose />
      </button>

      <div className="relative w-full max-w-[500px] h-auto">
        {/* Image with zoom functionality */}
        <Zoom>
          <img
            src={image}
            alt="Magnifiable"
            className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
          />
        </Zoom>
      </div>
    </div>
  );
};

export default MagnifyView;
