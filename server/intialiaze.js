const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/initialize", async (req, res) => {
  const { amount, email } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { amount, email },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

module.exports = router;
