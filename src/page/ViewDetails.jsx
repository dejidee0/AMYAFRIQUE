import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import { toast, ToastContainer } from "react-toastify";
import supabase from "../../supabase-client";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import MagnifyView from "../component/MagnifyView";

const ViewDetails = () => {
  const { id } = useParams();
  const [views, setViews] = useState(null);
  const [magnifyView, setMagnifyView] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [lensSize, setLensSize] = useState(250);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0, distance: 0 });

  const { addToCart, removeFromCart, cartItems } = useCartStore();
  const isInCart = cartItems.some((item) => item.id === views?.id);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ArtList")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setViews(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddToCart = () => {
    addToCart(views);
    toast.success(`${views.name} added to cart`, { autoClose: 2000 });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(views.id);
    toast.warn(`${views.name} removed from cart`, { autoClose: 2000 });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !imgRef.current) return;

      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      const containerRect = containerRef.current.getBoundingClientRect();
      const imgRect = imgRef.current.getBoundingClientRect();

      const maxX = containerRect.width - imgRect.width * scale;
      const maxY = containerRect.height - imgRect.height * scale;

      setPosition({
        x: Math.max(Math.min(newX, 0), maxX),
        y: Math.max(Math.min(newY, 0), maxY),
      });
    },
    [isDragging, scale, position]
  );

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const newScale = Math.min(Math.max(scale + e.deltaY * -0.01, 0.5), 4);

      // Calculate new position to maintain focus point
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const ratioX = (mouseX - position.x) / scale;
      const ratioY = (mouseY - position.y) / scale;

      const newX = position.x - ratioX * (newScale - scale);
      const newY = position.y - ratioY * (newScale - scale);

      setPosition({
        x: newX,
        y: newY,
      });

      setScale(newScale);
    },
    [scale, position]
  );

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      dragStart.current.distance = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY
      );
      dragStart.current.scale = scale;
    }
  };

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && dragStart.current.distance) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const newDistance = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY
      );

      const newScale =
        dragStart.current.scale * (newDistance / dragStart.current.distance);
      setScale(Math.min(Math.max(0.5, newScale), 4));
    }
  }, []);

  const handleImageMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  }, []);

  const resetView = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900">
        <svg
          className="w-24 h-24 mb-4 text-red-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <p className="text-xl mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="bg-gray-800/50 backdrop-blur-md border border-[#eb9b40] shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10">
          {/* Image Section */}
          <div className="relative group">
            <img
              src={views.image}
              alt={views.name}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => setMagnifyView(true)}
              className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-lg text-white px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              Magnify
            </button>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#eb9b40] mb-6">
              {views.name}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="text-lg text-gray-200 font-semibold">
                  {views.category}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Artist</p>
                <p className="text-lg text-green-400 font-bold">
                  {views.artist}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Stock Status</p>
                <p
                  className={`text-lg font-semibold ${
                    views.stockStatus === "In Stock"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {views.stockStatus}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-gray-300 text-xl font-semibold mb-4">
                Description:
              </p>
              <p className="text-gray-400 leading-relaxed">
                {views.description}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {isInCart ? (
                <button
                  onClick={handleRemoveFromCart}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FaCheckCircle /> In Cart
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-[#eb9b40] hover:bg-[#d18a38] text-black rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FaCartPlus /> Add to Cart
                </button>
              )}
              <button
                onClick={() => setMagnifyView(true)}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                Magnify Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Magnify Modal */}
      {magnifyView && (
        <MagnifyView
          image={views.image}
          onClose={() => setMagnifyView(false)}
        />
      )}
    </div>
  );
};

export default ViewDetails;
