const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

// Get user's cart
export const getCart = async (token) => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch cart"
    );
  }

  return data;
};

// Add product to cart
export const addToCart = async (
  productId,
  quantity,
  token
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      productId,
      quantity
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add product to cart"
    );
  }

  return data;
};

// Update cart item quantity
export const updateCartItem = async (
  productId,
  quantity,
  token
) => {
  const response = await fetch(
    `${API_URL}/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update cart"
    );
  }

  return data;
};

// Remove product from cart
export const removeFromCart = async (
  productId,
  token
) => {
  const response = await fetch(
    `${API_URL}/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove product"
    );
  }

  return data;
};