import axios from "axios";
import supabase from "../supabase-client.js"; // Import Supabase client

const PAYSTACK_SECRET_KEY = "sk_test_d85193414f0f8e7b2b95f67b1dacba68dfddef2e";
// Function to create a payment link
const createPaymentLink = async (req, res) => {
  const { amount, email } = req.body;
  console.log(amount);
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack expects the amount in Kobo
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    res.json({ paymentLink: response.data.data.authorization_url });
  } catch (error) {
    console.error("Error creating payment link", error);
    res.status(500).json({ message: "Failed to initialize payment" });
  }
};

// Function to verify a payment and store in Supabase
const verifyPayment = async (req, res) => {
  const { reference } = req.query;

  try {
    // Verify the Paystack payment
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    // Check if the payment is successful
    if (paymentData.status === "success") {
      // Store payment details in Supabase
      const { data, error } = await supabase
        .from("payments") // The Supabase table where payment details are stored
        .insert([
          {
            user_id: paymentData.email, // You can adjust this based on your user model
            amount: paymentData.amount / 100, // Convert from Kobo to Naira
            status: paymentData.status,
            paystack_reference: paymentData.reference,
            created_at: new Date(),
          },
        ]);

      if (error) {
        console.error("Error storing payment data in Supabase:", error);
        return res
          .status(500)
          .json({ message: "Failed to store payment data" });
      }

      // Return the verified payment data along with a success message
      return res.json({
        message: "Payment verified successfully",
        paymentData: data,
      });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

export { createPaymentLink, verifyPayment };
