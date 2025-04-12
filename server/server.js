import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paystackRoutes from "./routes/paystackRoutes.js";

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON bodies
dotenv.config();

// Paystack payment routes
app.use("/server/paystack", paystackRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
