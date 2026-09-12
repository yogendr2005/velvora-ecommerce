const API_URL = `${import.meta.env.VITE_API_URL}/api/payments`;

export const createPaymentOrder = async (token) => {
  const response = await fetch(`${API_URL}/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create payment order"
    );
  }

  return data;
};

export const verifyPayment = async (
  paymentData,
  token
) => {
  const response = await fetch(`${API_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Payment verification failed"
    );
  }

  return data;
};