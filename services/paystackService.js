import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Adjust this for production

export const createPaymentLink = async (amount, email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/create-payment-link`,
      {
        amount,
        email,
      }
    );
    return response.data.paymentLink;
  } catch (error) {
    throw new Error("Payment link creation failed");
  }
};

export const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/verify-payment`, {
      params: { reference },
    });
    return response.data;
  } catch (error) {
    throw new Error("Payment verification failed");
  }
};
