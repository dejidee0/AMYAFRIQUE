import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/paystack/verify/${reference}`
        );
        // handle success/failure based on response
      } catch (err) {
        console.error("Verification failed", err);
      }
    };

    if (reference) verifyPayment();
  }, [reference]);

  return (
    <div>
      <Navbar />
      Processing your payment...
    </div>
  );
};

export default PaymentCallback;
