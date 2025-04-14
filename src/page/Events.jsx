import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "../../lib/utils";

const slideVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};

const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      <motion.h2
        className="text-white text-5xl font-bold mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Past Events
      </motion.h2>

      <div className="relative w-full max-w-6xl h-[600px] rounded-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={events[currentIndex].id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={events[currentIndex].image}
              alt={events[currentIndex].title}
              className="w-full h-full object-cover rounded-3xl"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:p-10 text-white">
              <h3 className="text-3xl md:text-4xl font-semibold mb-1">
                {events[currentIndex].title}
              </h3>
              <p className="text-sm opacity-70 mb-3">
                {events[currentIndex].date}
              </p>
              <p className="text-base max-w-2xl">
                {events[currentIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentIndex === idx
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
