import { useCartStore } from "../store/cartStore";
import { FaTimes, FaLock, FaOpencart } from "react-icons/fa";
import { Slide, Fade } from "react-awesome-reveal";
import useAuthStore from "../store/authStore";
import { createPaymentLink, verifyPayment } from "../services/paystackService"; // Import the services
import { useState } from "react";

const MyCart = () => {
  const cartItems = useCartStore((state) => state.cartItems) || [];
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [paymentLink, setPaymentLink] = useState("");
  const [loading, setLoading] = useState(false);

  const getTotal = useCartStore((state) => state.getTotal);
  const user = useAuthStore((state) => state.user);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Replace with actual amount and user's email
      const amount = 5000; // Example amount
      const email = user.email; // Example email

      // Call the backend to create a Paystack payment link
      const link = await createPaymentLink(amount, email);

      // Set the link to be used for redirecting
      setPaymentLink(link);

      // Redirect user to Paystack for payment
      window.location.href = link;
    } catch (error) {
      console.error("Error initializing payment:", error);
      setLoading(false);
      // Handle the error (show a message to the user)
    }
  };

  const handleVerifyPayment = async (reference) => {
    try {
      const result = await verifyPayment(reference);
      console.log("Payment Verification Result:", result);

      if (result.paymentData.status === "success") {
        // Handle successful payment (e.g., show a success message, update order status)
      } else {
        // Handle failed payment (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <Fade triggerOnce duration={500}>
      <div className="min-h-screen p-8 flex flex-col md:flex-row gap-8 bg-gradient-to-br from-gray-50 to-gray-100">
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
                    <div className="flex gap-4 mt-2 text-gray-600">
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
            </Slide>
          )}
        </div>

        {/* Checkout Section */}
        <Slide direction="right" duration={600} triggerOnce>
          <div className="md:w-96 p-8 bg-white rounded-2xl shadow-xl h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>
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
            <button
              onClick={handlePayment}
              className="w-full mt-8 bg-[#eb9b40] hover:bg-[#d18a38] text-white py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaLock className="text-sm" />
              Proceed to Checkout
            </button>
          </div>
        </Slide>
      </div>
    </Fade>
  );
};

export default MyCart;
