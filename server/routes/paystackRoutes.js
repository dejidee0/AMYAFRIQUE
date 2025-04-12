import express from "express";
import { verifyPayment } from "../controllers/paystackController.js";
import { createPaymentLink } from "../controllers/paystackController.js";
const router = express.Router();

router.post("/create-payment-link", createPaymentLink);
// Verify transaction route
router.get("/verify/:reference", verifyPayment);

export default router; // Use export default for ES module syntax
