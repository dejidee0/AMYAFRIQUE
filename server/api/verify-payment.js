import axios from "axios";
import dotenv from "dotenv";
import { sendOrderConfirmationEmail } from "../mailer.js";

dotenv.config({ path: ".env.server" });

const { PAYSTACK_SECRET_KEY } = process.env;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference, email, orderDetails } = req.query;

  if (!reference || !email || !orderDetails) {
    return res.status(400).json({
      error: "Missing parameters: reference, email, or orderDetails",
    });
  }

  try {
    // Decode and parse order details
    const decodedOrderDetails = decodeURIComponent(orderDetails);
    let parsedOrderDetails;

    try {
      parsedOrderDetails = JSON.parse(decodedOrderDetails);
    } catch (parseError) {
      return res.status(400).json({ error: "Invalid order details format" });
    }

    // Verify payment with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data?.data;

    if (!paymentData || paymentData.status !== "success") {
      return res.status(400).json({
        error: "Payment verification failed",
        details: paymentData?.message || "Invalid payment status",
      });
    }

    // Send confirmation emails
    await sendOrderConfirmationEmail(email, parsedOrderDetails);

    return res.status(200).json({
      message: "Payment verified successfully, email sent.",
      paymentData: {
        amount: paymentData.amount / 100,
        currency: paymentData.currency,
        timestamp: paymentData.paid_at,
        customer: paymentData.customer,
      },
    });
  } catch (error) {
    console.error("Verification error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Payment verification failed",
      details: error.response?.data?.message || error.message,
    });
  }
}
