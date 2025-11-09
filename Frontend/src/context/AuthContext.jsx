import React, { createContext, useState, useEffect } from "react";
import apiClient from "../services/api"; // We will update this file next

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This runs when the app first loads
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Set the token for all future requests
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          // Get user data from your backend's "/me" route
          const { data } = await apiClient.get("/users/me");

          // Your backend sends { user: ... }, so we use data.user
          setUser(data.user);
        } catch (error) {
          console.error("Auth Error:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // This function will be used on the profile page
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
