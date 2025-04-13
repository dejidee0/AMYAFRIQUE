// pages/api/create-payment-link.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, amount } = req.body;

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // convert Naira to Kobo
          callback_url: `${process.env.VITE_PUBLIC_BASE_URL}/payment-success`,
        }),
      }
    );

    const data = await response.json();

    if (data.status) {
      return res.status(200).json(data.data); // contains authorization_url, reference, etc.
    } else {
      return res
        .status(400)
        .json({ message: "Failed to initialize payment", data });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
