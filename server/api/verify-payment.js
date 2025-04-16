// controllers/paystackController.js
import axios from "axios";
import supabase from "../supabase-client.js"; // make sure this path is correct
import dotenv from "dotenv";
dotenv.config({ path: ".env.server" });

export const verifyPayment = async (req, res) => {
  const reference = req.query.reference;

  if (!reference) {
    return res.status(400).json({ message: "Reference is required" });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      const { data, error } = await supabase.from("payments").insert([
        {
          user_id: paymentData.customer.email,
          amount: paymentData.amount / 100,
          status: paymentData.status,
          paystack_reference: paymentData.reference,
          created_at: new Date(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        return res
          .status(500)
          .json({ message: "Failed to store payment data" });
      }

      return res.json({
        message: "Payment verified successfully",
        paymentData: data,
      });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};
