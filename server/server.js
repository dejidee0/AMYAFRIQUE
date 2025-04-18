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
app.get("/api/verify-payment", verifyPayment);

app.get("/", (req, res) => {
  res.send("Amy Afrique is Ready to serve!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
