import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Create Payment Link
const createPaymentLink = async (req, res) => {
  const { amount, email } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // convert to Kobo
        callback_url: `${
          req.headers.origin || "http://localhost:3000"
        }/checkout-success`, // Adjust callback if needed
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ paymentLink: response.data.data.authorization_url });
  } catch (error) {
    console.error(
      "Error creating payment link:",
      error?.response?.data || error
    );
    res.status(500).json({ message: "Failed to initialize payment" });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  const { reference } = req.query;

  console.log("Received reference:", reference);

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;
    console.log("Payment data from Paystack:", paymentData);

    if (paymentData.status !== "success") {
      return res.status(400).json({
        message: "Payment not successful",
        paymentStatus: paymentData.status,
      });
    }

    const customerEmail = paymentData.customer?.email;
    if (!customerEmail) {
      console.error("No customer email found");
      return res.status(400).json({ message: "Customer email missing" });
    }

    // Removed Supabase insert logic

    return res
      .status(200)
      .json({ message: "Payment verified successfully", paymentData });
  } catch (error) {
    console.error(
      "Unexpected error:",
      error?.response?.data || error.message || error
    );
    return res
      .status(500)
      .json({ message: "Payment verification failed", error });
  }
};

export { createPaymentLink, verifyPayment };
