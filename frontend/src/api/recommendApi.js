import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Localhost for development
  headers: { "Content-Type": "application/json" },
});

// Function to fetch internship recommendations
export const getRecommendations = async (profile) => {
  try {
    // Send the full profile object, not just skills
    const res = await api.post("/recommend", profile);
    console.log("Recommendations fetched:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
