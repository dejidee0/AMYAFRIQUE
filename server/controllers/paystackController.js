import axios from "axios";
import supabase from "../supabase-client.js"; // Adjust if your Supabase file is elsewhere

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

    if (paymentData.status !== "success") {
      return res
        .status(400)
        .json({
          message: "Payment not successful",
          paymentStatus: paymentData.status,
        });
    }

    // Log customer details
    console.log("Payment data:", paymentData);

    const { email } = paymentData.customer ?? {};
    if (!email) {
      return res
        .status(400)
        .json({ message: "No customer email found in payment data." });
    }

    const { error } = await supabase.from("payments").insert([
      {
        user_id: email,
        reference: paymentData.reference,
        amount: paymentData.amount / 100,
        status: paymentData.status,
        metadata: paymentData.metadata,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ message: "Supabase insert failed", error });
    }

    return res.status(200).json({
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error?.response?.data || error
    );
    return res
      .status(500)
      .json({ message: "Payment verification failed", error });
  }
};

export { createPaymentLink, verifyPayment };
