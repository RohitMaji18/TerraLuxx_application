import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { Toaster } from "@/components/ui/sonner"; // Import Toaster
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Wrap App with AuthProvider */}
        <App />
        {/* <Toaster position="top-right" richColors /> Add Toaster here */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
