// pages/payment-success.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");
  const clearCart = useCartStore((state) => state.clearCart);
  const reference = new URLSearchParams(location.search).get("reference");

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setStatus("Missing payment reference");
        return;
      }

      try {
        const orderData = JSON.parse(localStorage.getItem("orderData"));
        if (!orderData) {
          setStatus("Order data not found.");
          return;
        }

        // Construct query parameters
        const queryParams = new URLSearchParams({
          reference,
          email: orderData.email,
          orderDetails: encodeURIComponent(JSON.stringify(orderData.cartItems)),
        }).toString();

        // Use GET request with query parameters
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/verify-payment?${queryParams}`
        );

        if (!res.ok) {
          setStatus("Payment verification failed");
          return;
        }

        const data = await res.json();

        if (data.message === "Payment verified successfully, email sent.") {
          // Send order confirmation to business owner
          try {
            await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/send-order-email`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: orderData.email,
                  subject: "New Order Confirmation",
                  message: `Order from ${orderData.email}: ${JSON.stringify(
                    orderData.cartItems
                  )}`,
                }),
              }
            );
          } catch (emailError) {
            console.error("Email sending failed:", emailError);
          }

          clearCart();
          setTimeout(() => navigate("/thank-you"), 2000);
          setStatus("Payment Verified Successfully!");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("Payment verification failed");
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
