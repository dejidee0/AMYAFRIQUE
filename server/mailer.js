// mailer.mjs
import nodemailer from "nodemailer";

const sendOrderConfirmationEmail = async (email, orderDetails) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASSWORD, // Your Gmail password or App password
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER, // sender address
    to: email, // recipient address
    subject: "Order Confirmation - Payment Success",
    html: `<h1>Order Confirmation</h1>
           <p>Your order has been successfully placed. Here are your order details:</p>
           <ul>
             <li><strong>Order ID:</strong> ${orderDetails.id}</li>
             <li><strong>Amount:</strong> ${orderDetails.amount}</li>
             <li><strong>Items:</strong> ${orderDetails.items.join(", ")}</li>
           </ul>
           <p>Thank you for your purchase!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendOrderConfirmationEmail };
