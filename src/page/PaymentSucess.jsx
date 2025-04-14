// pages/payment-success.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // React Router v6 hooks

const PaymentSuccess = () => {
  const location = useLocation(); // For accessing URL query params
  const navigate = useNavigate(); // For navigating after payment success
  const [status, setStatus] = useState("Verifying...");

  // Extracting the reference from the URL query params
  const reference = new URLSearchParams(location.search).get("reference");

  useEffect(() => {
    const verify = async () => {
      if (!reference) return;

      try {
        const res = await fetch(`/api/verify-payment?reference=${reference}`);
        const data = await res.json();

        if (res.ok && data.paymentData) {
          setStatus("Payment Verified Successfully!");
          // You can navigate to another page or show a receipt
          setTimeout(() => {
            navigate("/thank-you"); // Navigate to a thank-you page or home
          }, 2000);
        } else {
          setStatus("Payment Verification Failed.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatus("Something went wrong during verification.");
      }
    };

    verify();
  }, [reference, navigate]);

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
