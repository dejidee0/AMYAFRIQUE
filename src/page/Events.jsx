import React, { useState, useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "keen-slider/keen-slider.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const events = [
  {
    title: "The Colors of Silence",
    date: "March 12, 2024",
    location: "Modern Art Museum, NY",
    image: "/event1.heic",
  },
  {
    title: "Whispers of Nature",
    date: "May 20, 2023",
    location: "National Gallery, London",
    image:
      "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Echoes & Shadows",
    date: "Sept 5, 2022",
    location: "The Louvre, Paris",
    image:
      "https://images.unsplash.com/photo-1611822302303-4766e94cbd65?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Timeless Motion",
    date: "Jan 14, 2022",
    location: "Art Basel, Miami",
    image:
      "https://images.unsplash.com/photo-1504199369937-64c7f1c0ec2f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Fractured Light",
    date: "July 9, 2021",
    location: "The Getty, LA",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
];

const EventsSlider = () => {
  const timer = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const activeEvent = activeIndex !== null ? events[activeIndex] : null;

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    drag: true,
    renderMode: "performance",
    slides: {
      origin: "center",
      perView: 1.2,
      spacing: 24,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.2, spacing: 32 },
      },
    },
    created() {
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    },
    destroyed() {
      clearInterval(timer.current);
    },
  });

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (!modalOpen) return;

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % events.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
      } else if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  const openModal = (index) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveIndex(null), 300);
  };

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % events.length);
  const prevImage = () =>
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section className="relative px-4 md:px-12 lg:px-20 py-16">
      <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-4 tracking-tight">
        Past Art Exhibitions
      </h2>
      <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
        A journey through timeless creativity, color, and culture.
      </p>

      <div
        ref={sliderRef}
        className="keen-slider cursor-grab active:cursor-grabbing"
      >
        {events.map((event, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="keen-slider__slide relative group rounded-xl overflow-hidden shadow-xl transition-all duration-700"
            onClick={() => openModal(i)}
          >
            <LazyLoadImage
              effect="blur"
              src={event.image}
              alt={event.title}
              className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
              <h3 className="text-white text-2xl font-semibold">
                {event.title}
              </h3>
              <p className="text-sm text-gray-200">{event.location}</p>
              <p className="text-sm text-gray-400">{event.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && activeEvent && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={closeModal}
          >
            <motion.div
              key="modal-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative max-w-4xl w-full overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeEvent.image}
                alt={activeEvent.title}
                className="w-full h-[75vh] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-6">
                <h3 className="text-3xl font-semibold">{activeEvent.title}</h3>
                <p className="text-sm mt-1">{activeEvent.location}</p>
                <p className="text-xs text-gray-300">{activeEvent.date}</p>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white text-xl"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white text-xl"
              >
                ›
              </button>

              {/* Close Button */}
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.2 }}
                className="absolute top-4 right-4 text-white text-xl bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 transition"
                aria-label="Close"
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventsSlider;
