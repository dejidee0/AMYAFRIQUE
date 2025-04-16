// api/create-payment.js
import fetch from "node-fetch"; // Only if Node < 18
import supabase from "../supabase-client.js";

const { PAYSTACK_SECRET_KEY } = process.env;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, amount, metadata } = req.body;

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100,
          metadata,
          callback_url: `${req.headers.origin}/api/verify-payment`,
        }),
      }
    );

    const payment = await response.json();

    if (!payment.status)
      throw new Error(payment.message || "Payment init failed");

    const { error } = await supabase.from("payments").insert({
      reference: payment.data.reference,
      email,
      amount,
      status: "pending",
    });

    if (error) throw new Error("Supabase insert failed");

    return res.status(200).json({
      authorization_url: payment.data.authorization_url,
      reference: payment.data.reference,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
