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

  if (!reference) {
    console.error("No reference provided");
    return res.status(400).json({ message: "Reference is required" });
  }

  try {
    // Make request to Paystack API to verify the payment
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    // Check if the response is successful
    if (response.data.status !== "success") {
      console.error("Payment verification failed:", response.data.message);
      return res.status(400).json({
        message: "Payment not successful",
        paymentStatus: response.data.status,
      });
    }

    // Extract payment data from Paystack response
    const paymentData = response.data.data;
    console.log("Payment data from Paystack:", paymentData);

    // Check if the payment data has the customer email
    const customerEmail = paymentData.customer?.email;
    if (!customerEmail) {
      console.error("No customer email found");
      return res.status(400).json({ message: "Customer email missing" });
    }

    // If successful, return a success response
    return res.status(200).json({
      message: "Payment verified successfully",
      paymentData,
    });
  } catch (error) {
    console.error(
      "Error occurred while verifying payment:",
      error?.response?.data || error.message || error
    );
    return res
      .status(500)
      .json({ message: "Payment verification failed", error });
  }
};

export { createPaymentLink, verifyPayment };
