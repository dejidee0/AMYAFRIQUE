import React, { useState, useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "keen-slider/keen-slider.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { events } from "../lib/utils";

const EventsSlider = () => {
  const timer = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const activeEvent = activeIndex !== null ? events[activeIndex] : null;

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    drag: false,
    renderMode: "performance",
    slides: {
      origin: "center",
      perView: 1.2,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.5, spacing: 32 },
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

  const openModal = (index) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <section className="relative px-6 py-20 bg-gray-900">
      <h2 className="text-5xl font-extrabold text-white text-center mb-8 tracking-tight">
        Past Art Exhibitions
      </h2>
      <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
        Explore a selection of groundbreaking art exhibitions, showcasing the
        intersection of culture and creativity.
      </p>

      <div ref={sliderRef} className="keen-slider cursor-grab">
        {events.map((event, i) => (
          <div
            key={i}
            className="keen-slider__slide relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
            onClick={() => openModal(i)}
          >
            <LazyLoadImage
              effect="blur"
              src={event.image}
              alt={event.title}
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
              <h3 className="text-white text-2xl font-semibold">
                {event.title}
              </h3>
              <p className="text-sm text-gray-200">{event.location}</p>
              <p className="text-sm text-gray-400">{event.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && activeEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full overflow-hidden rounded-2xl shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeEvent.image}
              alt={activeEvent.title}
              className="w-full h-[60vh] object-cover rounded-t-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 text-white p-6">
              <h3 className="text-3xl font-semibold">{activeEvent.title}</h3>
              <p className="text-sm mt-1">{activeEvent.location}</p>
              <p className="text-xs text-gray-300">{activeEvent.date}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xl bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSlider;
