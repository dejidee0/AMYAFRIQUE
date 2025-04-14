// Function to create a payment link by calling the backend API
const createPaymentLink = async (amount, email) => {
  try {
    // Send amount and email to backend to create the payment link
    const response = await fetch(
      "http://localhost:5000/server/paystack/create-payment-link",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, email }), // Send data as JSON
      }
    );

    const data = await response.json();

    if (data.paymentLink) {
      return data.paymentLink; // Return the Paystack payment link
    } else {
      throw new Error("Failed to create payment link");
    }
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw new Error("Payment link creation failed");
  }
};

// Function to verify payment by calling backend API
const verifyPayment = async (reference) => {
  try {
    // Send the reference to the backend to verify payment
    const response = await fetch(
      `http://localhost:5000/server/paystack/verify-payment?reference=${reference}`
    );

    const data = await response.json();
    return data; // Return the payment verification result
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw new Error("Payment verification failed");
  }
};

export { createPaymentLink, verifyPayment };
