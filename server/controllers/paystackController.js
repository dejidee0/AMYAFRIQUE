import axios from "axios";
import nodemailer from "nodemailer";

// Create Payment Link
const createPaymentLink = async (req, res) => {
  const { amount, email } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        callback_url: `${
          req.headers.origin || "http://localhost:3000"
        }/checkout-success`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
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
// Verify Payment
const verifyPayment = async (req, res) => {
  let { reference, email, orderDetails } = req.query;

  if (!reference || !email || !orderDetails) {
    return res
      .status(400)
      .json({ error: "Missing reference, email, or order details" });
  }

  try {
    // Decode URI component and parse order details
    orderDetails = decodeURIComponent(orderDetails);
    let parsedOrderDetails;
    try {
      parsedOrderDetails = JSON.parse(orderDetails);
    } catch (parseError) {
      return res.status(400).json({ error: "Invalid order details format" });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status !== "success") {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    await sendOrderConfirmationEmail(email, parsedOrderDetails);

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
};

// Email Sender
const sendOrderConfirmationEmail = async (email, orderDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Order Confirmation",
    text: `Thank you for your order! Here are your order details: ${JSON.stringify(
      orderDetails,
      null,
      2
    )}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent!");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export { createPaymentLink, verifyPayment, sendOrderConfirmationEmail };
