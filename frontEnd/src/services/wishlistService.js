const API_URL = "http://localhost:5000/api/wishlist";

// GET WISHLIST

export const getWishlist = async (token) => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch wishlist"
    );
  }

  return data;
};

// ADD TO WISHLIST

export const addToWishlist = async (
  productId,
  token
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      productId
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to add product to wishlist"
    );
  }

  return data;
};

// REMOVE FROM WISHLIST

export const removeFromWishlist = async (
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
      data.message ||
        "Failed to remove product from wishlist"
    );
  }

  return data;
};