const API_URL = "http://localhost:5000/api/orders";

// CREATE ORDER

export const createOrder = async (
  orderData,
  token
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to place order"
    );
  }

  return data;
};

// GET MY ORDERS

export const getMyOrders = async (token) => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
};

export const getAllOrders = async (token) => {
  const response = await fetch(`${API_URL}/admin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch all orders"
    );
  }

  return data;
};

export const updateOrderStatus = async (
  orderId,
  orderStatus,
  token
) => {
  const response = await fetch(
    `${API_URL}/${orderId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ orderStatus })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update order status"
    );
  }

  return data;
};