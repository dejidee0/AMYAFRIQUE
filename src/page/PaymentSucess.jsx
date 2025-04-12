import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Using React Router for page routing
import { verifyPayment } from "../services/paystackService";

const PaymentSuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get the current location (URL)

  // Extract reference from the URL
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");

  useEffect(() => {
    if (reference) {
      // Call the verifyPayment function to check if the payment was successful
      const verifyPaymentStatus = async () => {
        try {
          const result = await verifyPayment(reference); // Call the backend API
          if (result.paymentData.status === "success") {
            setPaymentStatus("Payment successful");
          } else {
            setPaymentStatus("Payment failed");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setPaymentStatus("Error verifying payment");
        }
        setLoading(false);
      };

      verifyPaymentStatus(); // Call the function when the component mounts
    } else {
      setPaymentStatus("No payment reference found");
      setLoading(false);
    }
  }, [reference]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{paymentStatus}</h1>
          {/* You can add more logic to display further payment details or handle errors */}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
