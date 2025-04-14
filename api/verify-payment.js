import axios from "axios";
import supabase from "../supabase-client";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { reference } = req.query;

  try {
    // Verify the Paystack payment
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    // Check if the payment is successful
    if (paymentData.status === "success") {
      const { data, error } = await supabase.from("payments").insert([
        {
          user_id: paymentData.customer.email, // or paymentData.email
          amount: paymentData.amount / 100,
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

      return res.json({
        message: "Payment verified successfully",
        paymentData: data,
      });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Payment verification failed" });
  }
}
