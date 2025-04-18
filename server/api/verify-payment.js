import axios from "axios";
import dotenv from "dotenv";
import { sendOrderConfirmationEmail } from "../mailer.js"; // Import the email sending function

dotenv.config({ path: ".env.server" }); // Load PAYSTACK_SECRET_KEY

const { PAYSTACK_SECRET_KEY } = process.env;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference, email, orderDetails } = req.query; // Get email and orderDetails from query
  console.log(reference);
  if (!reference || !email || !orderDetails) {
    return res
      .status(400)
      .json({ error: "Missing reference, email, or order details" });
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

    // Send confirmation email after successful payment
    await sendOrderConfirmationEmail(email, JSON.parse(orderDetails)); // Send order details as email content

    return res.status(200).json({
      message: "Payment verified successfully, email sent.",
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
