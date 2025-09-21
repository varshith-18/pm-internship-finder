import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: "http://192.168.105.63:5000/api", // LAN IP
  headers: { "Content-Type": "application/json" },
});

// Function to fetch internship recommendations
export const getRecommendations = async (profile) => {
  try {
    const res = await api.post("/recommend", profile); // use the api instance
    return res.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
