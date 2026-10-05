const API_URL = `${import.meta.env.VITE_API_URL}/api/admin`;

export const getActivityLogs = async (token, params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value)
  ).toString();

  const response = await fetch(`${API_URL}/activity?${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch activity logs"
    );
  }

  return data;
};