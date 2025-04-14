// api/create-payment.js
import paystack from "paystack";
import supabase from "../../supabase-client";
const { PAYSTACK_SECRET_KEY } = process.env;

const paystackClient = paystack(PAYSTACK_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, amount, metadata } = req.body;

    // Create Paystack payment
    const payment = await paystackClient.transaction.initialize({
      email,
      amount: amount * 100, // Convert to kobo
      metadata,
      callback_url: `${req.headers.origin}/api/verify-payment`,
    });

    // Store initial payment in Supabase
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
