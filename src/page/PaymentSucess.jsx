// pages/payment-success.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // React Router v6 hooks
import { useCartStore } from "../store/cartStore";

const PaymentSuccess = () => {
  const location = useLocation(); // For accessing URL query params
  const navigate = useNavigate(); // For navigating after payment success
  const [status, setStatus] = useState("Verifying...");
  const clearCart = useCartStore((state) => state.clearCart);
  // Extracting the reference from the URL query params
  const reference = new URLSearchParams(location.search).get("reference");

  useEffect(() => {
    const verify = async () => {
      if (!reference) return;

      try {
        // Retrieve order data from local storage
        const orderData = JSON.parse(localStorage.getItem("orderData"));
        if (!orderData) {
          setStatus("Order data not found.");
          return;
        }

        const { email, cartItems } = orderData;
        const orderDetails = cartItems; // No need to stringify here, as we will send it in the body

        // Verify payment using POST
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reference,
              email,
              orderDetails,
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();

          if (data.message === "Payment verified successfully, email sent.") {
            // Send order details to the business owner's email
            const emailResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/send-order-email`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...orderData,
                  subject: "New Order Confirmation",
                  message: `Order from ${
                    orderData.email
                  }, details: ${JSON.stringify(orderData.cartItems)}`,
                }),
              }
            );

            if (emailResponse.ok) {
              console.log("Order details sent to business owner.");
            } else {
              console.error("Failed to send order details.");
            }

            // Clear cart and navigate
            clearCart();
            setTimeout(() => {
              navigate("/thank-you"); // Navigate to a thank-you page or home
            }, 2000);
          } else {
            setStatus("Payment verification failed.");
          }
        } else {
          setStatus("Payment verification failed.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatus("Something went wrong during verification.");
      }
    };

    verify();
  }, [reference, navigate, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">{status}</h1>
        {status === "Payment Verified Successfully!" && (
          <p className="text-green-500 mt-4">Thank you for your purchase 🎉</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
