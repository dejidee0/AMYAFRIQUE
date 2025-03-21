import { useEffect, useState } from "react";
import { Slide, Fade } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import { toast, ToastContainer } from "react-toastify";
import supabase from "../../supabase-client";
import "react-toastify/dist/ReactToastify.css";

const ViewDetails = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const { id } = useParams();
  const [views, setViews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("ArtList") // Ensure correct table name
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setViews(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const isInCart = cartItems.some((item) => item.id === views.id);

  const handleAddToCart = () => {
    addToCart(views);
    toast.success(`${views.name} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(views.id);
    toast.warn(`${views.name} removed from cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error}
      </div>
    );
  }

  return (
    <Slide>
      <ToastContainer />
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-800/50 backdrop-blur-md border border-[#eb9b40] shadow-xl rounded-xl overflow-hidden max-w-5xl mx-auto p-10 flex flex-col md:flex-row items-center gap-10 transition-all hover:shadow-2xl">
          {/* Image Section */}
          <Fade delay={100}>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={views.image}
                alt={views.name}
                className="rounded-lg object-cover w-full h-[500px] max-h-[400px] shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Fade>

          {/* Details Section */}
          <div className="w-full md:w-1/2">
            <Fade cascade damping={0.1}>
              <h1 className="text-4xl font-extrabold text-[#eb9b40] mb-4">
                {views.name}
              </h1>

              <div className="grid grid-cols-2 gap-3 text-gray-300 text-lg">
                <p className="font-semibold">Category:</p>
                <p className="text-gray-400">{views.category}</p>

                <p className="font-semibold">Artist:</p>
                <p className="text-2xl font-bold text-green-400">
                  {views.artist}
                </p>

                <p className="font-semibold">Stock Status:</p>
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

              {/* Short Description */}
              <div className="mt-6">
                <p className="font-semibold text-xl text-gray-300">
                  Description:
                </p>
                <p className="text-gray-400 text-md leading-relaxed">
                  {views.description}
                </p>
              </div>

              {/* Cart Buttons */}
              <div className="mt-8 flex items-center gap-4">
                {isInCart ? (
                  <button
                    onClick={handleRemoveFromCart}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all text-lg"
                  >
                    <FaCheckCircle /> In Cart (Remove)
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 bg-[#eb9b40] hover:bg-[#d18a38] text-black font-bold py-3 px-6 rounded-lg transition-all text-lg"
                  >
                    <FaCartPlus /> Add to Cart
                  </button>
                )}
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ViewDetails;
