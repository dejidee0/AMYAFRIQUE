import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  createPaymentLink,
  verifyPayment,
} from "./controllers/paystackController.js";

dotenv.config({ path: ".env.server" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/create-payment-link", createPaymentLink);
app.get("/api/verify-payment", verifyPayment); // use GET because reference is sent in query string

app.get("/", (req, res) => {
  res.send("Art website backend is live!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
