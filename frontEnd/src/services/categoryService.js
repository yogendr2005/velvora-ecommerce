const API_URL = `${import.meta.env.VITE_API_URL}/api/categories`;

export const getCategories = async () => {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch categories"
    );
  }

  return data;
};