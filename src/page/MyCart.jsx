import { useState } from "react";
import { FaOpencart, FaTimes, FaCartPlus } from "react-icons/fa";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import DeliveryForm from "../component/DeliveryForm";
import { useCartStore } from "../store/cartStore";
import { createPaymentLink } from "../../services/paystackService";

const CartPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if form is complete
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // Store the email from the form
  const cartItems = useCartStore((state) => state.cartItems) || [];
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotal = useCartStore((state) => state.getTotal);
  const [paymentLink, setPaymentLink] = useState("");

  const errorMessage = ""; // Replace with error handling logic

  const handlePayment = async () => {
    setLoading(true);
    try {
      const amount = getTotal() * 1000; // Use actual total amount

      if (!email) {
        alert(
          "You must fill your email in the delivery form to proceed with payment."
        );
        setLoading(false);
        return;
      }

      const link = await createPaymentLink(amount, email);
      setPaymentLink(link);
      // Save delivery form data to localStorage
      const formData = {
        email,
        cartItems,
        totalAmount: amount,
      };
      localStorage.setItem("orderData", JSON.stringify(formData));

      window.location.href = link;
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("There was an error initializing payment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // This function will be passed to the DeliveryForm to update the form completion status
  const handleFormCompletion = (completed, userEmail) => {
    setIsFormComplete(completed);
    if (completed) {
      setEmail(userEmail); // Save the email when the form is complete
    }
  };

  // Button click handler that determines behavior based on form completion
  const handleButtonClick = () => {
    if (isFormComplete) {
      handlePayment();
    } else {
      setIsVisible(true); // Open the delivery form if form isn't complete
    }
  };

  return (
    <div className="relative">
      <div
        className={`${
          isVisible
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-full opacity-0"
        } fixed h-[90%] overflow-y-auto left-0 bottom-0 w-full bg-white/60 backdrop-blur-md rounded-t-xl shadow-lg transition-all duration-500`}
        style={{ zIndex: 999 }}
      >
        <DeliveryForm
          setIsVisible={setIsVisible}
          onFormCompletion={handleFormCompletion} // Pass form completion handler
        />
      </div>
      <div className="p-8 flex flex-col md:flex-row gap-8 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          <Slide direction="left" duration={600}>
            <div className="flex items-center gap-3 mb-8">
              <FaOpencart className="text-3xl text-[#eb9b40]" />
              <h1 className="text-3xl font-bold text-gray-800">
                Your Cart{" "}
                <span className="text-gray-500">({cartItems.length})</span>
              </h1>
            </div>
          </Slide>

          {cartItems.length === 0 ? (
            <Fade>
              <div className="text-center py-20">
                <FaOpencart className="text-6xl text-gray-300 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-500 text-xl">
                  Your cart is feeling lonely...
                </p>
              </div>
            </Fade>
          ) : (
            <Slide cascade damping={0.1} duration={300}>
              <div>
                {cartItems.map(({ id, title, image, price }) => (
                  <div
                    key={id}
                    className="group flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {title}
                      </h3>
                      <div className="mt-2 text-gray-600">
                        <p>₦{(price * 1000).toLocaleString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                      aria-label="Remove item"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </Slide>
          )}
        </div>

        {/* Order Summary */}
        <Slide direction="right" duration={600} triggerOnce>
          <div className="md:w-96 p-8 bg-white rounded-2xl shadow-xl h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                {errorMessage}
              </div>
            )}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  ₦{(getTotal() * 1000).toLocaleString()}
                </span>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total:</span>
                <span>₦{(getTotal() * 1000).toLocaleString()}</span>
              </div>
            </div>
            {/* Conditional button based on form completion */}
            <button
              onClick={handleButtonClick} // Use the unified button handler
              disabled={loading || (isFormComplete && !cartItems.length)}
              className={`w-full mt-8 ${
                loading || !isFormComplete
                  ? "bg-[#eb9b40]"
                  : "bg-[#eb9b40] hover:bg-[#d18a38]"
              } text-white py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <FaCartPlus className="text-sm" />
              {loading
                ? "Redirecting..."
                : isFormComplete
                ? "Proceed to Checkout"
                : "Add Delivery Info"}
            </button>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default CartPage;
