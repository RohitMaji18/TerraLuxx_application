import axios from "axios";
import { toast } from "sonner"; // <-- IMPORT TOAST

// Create an instance of axios with the base URL of your backend
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// --- GLOBAL ERROR HANDLER ---
// This intercepts all responses. If it's an error, it shows a toast.
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle errors
    const message =
      error.response?.data?.message || "An unexpected error occurred.";
    toast.error(message); // Show the error toast

    // IMPORTANT: Re-throw the error so component .catch() blocks still work
    return Promise.reject(error);
  }
);

// This function will handle user registration
export const registerUser = (userData) => {
  return apiClient.post("/users/register", userData);
};

// This function will handle user login
export const loginUser = (credentials) => {
  return apiClient.post("/users/login", credentials);
};

// You can add other API functions for tours, bookings, etc. here in the future.
export const getAllTours = () => {
  return apiClient.get("/tours");
};

// --- NEW FUNCTIONS TO MATCH YOUR BACKEND ---

// Gets the current user's data
// Corresponds to: GET /api/v1/users/me
apiClient.getMe = () => {
  return apiClient.get("/users/me");
};

// Updates the current user's data
// Corresponds to: PATCH /api/v1/users/updateMe
apiClient.updateMe = (updateData) => {
  return apiClient.patch("/users/updateMe", updateData);
};

export default apiClient;
