import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5"; // Import close icon (npm install react-icons)

const MagnifyView = ({ image, zoom = 2, onClose }) => {
  const [lensPosition, setLensPosition] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x > 0 && x < width && y > 0 && y < height) {
      setLensPosition({ x, y, visible: true });
    } else {
      setLensPosition({ ...lensPosition, visible: false });
    }
  };

  // Handle touch events for mobile users
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    }
  };

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

      <div
        className="relative w-full max-w-[500px] h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() =>
          setLensPosition({ ...lensPosition, visible: false })
        }
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setLensPosition({ ...lensPosition, visible: false })}
      >
        {/* Main Image */}
        <img
          ref={imageRef}
          src={image}
          alt="Magnifiable"
          className="w-full h-auto rounded-lg shadow-lg"
        />

        {/* Magnifying Lens */}
        {lensPosition.visible && (
          <div
            className="absolute w-24 h-24 sm:w-32 sm:h-32 border-2 border-gray-300 rounded-full overflow-hidden pointer-events-none shadow-lg transition-transform duration-150 ease-out"
            style={{
              left: lensPosition.x - 48,
              top: lensPosition.y - 48,
              backgroundImage: `url(${image})`,
              backgroundSize: `${imageRef.current.width * zoom}px ${
                imageRef.current.height * zoom
              }px`,
              backgroundPosition: `-${lensPosition.x * zoom - 48}px -${
                lensPosition.y * zoom - 48
              }px`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MagnifyView;
