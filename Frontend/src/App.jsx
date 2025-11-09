import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner"; // <-- 1. IMPORT TOASTER

// ... other imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToursPage from "./pages/ToursPage";
import UserProfile from "./pages/UserProfile";
// ... etc

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        {/* THIS PROP (richColors) IS WHAT MAKES IT WORK */}
        <Toaster richColors position="top-center" />
      </div>
    </AuthProvider>
  );
}

export default App;
