import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or your preferred icon library

const artEvents = [
  {
    id: 1,
    image: "/exhibition1.jpg",
    title: "Modern Abstraction",
    date: "15 SEP - 30 OCT 2024",
    artist: "Lena Voss",
  },
  {
    id: 2,
    image: "/exhibition2.jpg",
    title: "Sculpture Garden",
    date: "1 NOV - 15 DEC 2024",
    artist: "Marco Silva",
  },
  // Add more events...
];

const EventSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % artEvents.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + artEvents.length) % artEvents.length);
  };

  const variants = {
    initial: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative h-full w-full">
            {/* Main Event Image */}
            <motion.img
              src={artEvents[currentIndex].image}
              alt={artEvents[currentIndex].title}
              className="h-full w-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-8 left-8 text-white">
                <motion.h2
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-4xl font-bold mb-2"
                >
                  {artEvents[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  className="text-xl mb-1"
                >
                  {artEvents[currentIndex].artist}
                </motion.p>
                <motion.p
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  className="text-lg opacity-75"
                >
                  {artEvents[currentIndex].date}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Thumbnail Preview */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        {artEvents.map((event, index) => (
          <motion.div
            key={event.id}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className="relative h-20 w-32 cursor-pointer overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                layoutId="thumb-overlay"
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventSlider;
