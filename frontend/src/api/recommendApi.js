import axios from "axios";

// Determine backend base URL dynamically
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api" // development
    : `http://${window.location.hostname}:5000/api`; // LAN access

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
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
