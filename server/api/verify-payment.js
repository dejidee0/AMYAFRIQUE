// api/verify-payment.js (Node.js / Express / Next.js-compatible)
import axios from "axios";
import supabase from "../supabase-client.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.server" }); // Load PAYSTACK_SECRET_KEY

const { PAYSTACK_SECRET_KEY } = process.env;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ error: "Reference is required" });
  }

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
      return res.status(400).json({ error: "Payment verification failed" });
    }

    // ✅ Optional: update the existing row with final payment status
    const { error: supabaseError } = await supabase
      .from("payments")
      .update({
        status: "success",
        paystack_reference: paymentData.reference,
        verified_at: new Date(),
      })
      .eq("reference", reference);

    if (supabaseError) {
      console.error("Supabase update error:", supabaseError);
      return res
        .status(500)
        .json({ error: "Payment verified, but DB update failed" });
    }

    return res.status(200).json({
      message: "Payment verified successfully",
      paymentData,
    });
  } catch (error) {
    console.error(
      "Verification error:",
      error?.response?.data || error.message
    );
    return res.status(500).json({ error: "Payment verification failed" });
  }
}
