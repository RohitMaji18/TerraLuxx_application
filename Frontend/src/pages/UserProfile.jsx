import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import apiClient from "../services/api";
import { toast } from "sonner"; // <-- IMPORT TOAST
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserProfile = () => {
  const { user, updateUser, loading } = useContext(AuthContext);

  // State for forms
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Pre-fill form when user data loads
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Handle data update (Name and Email)
  const handleUpdateData = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data } = await apiClient.updateMe({ name, email });
      updateUser(data.user); // Update context with new user data
      toast.success("Profile updated successfully!"); // <-- SUCCESS TOAST
    } catch (err) {
      // LEAVE THIS EMPTY
      // api.js is already showing the error toast.
    }
    setIsUpdating(false);
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data } = await apiClient.updateMe({ currentPassword, password });
      toast.success("Password updated successfully!"); // <-- SUCCESS TOAST
      // Clear password fields
      setCurrentPassword("");
      setPassword("");
    } catch (err) {
      // LEAVE THIS EMPTY
      // api.js is already showing the error toast.
    }
    setIsUpdating(false);
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!user) return <p className="text-center p-10">Please log in.</p>;

  return (
    <div className="container max-w-4xl mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* --- Form 1: Update User Data --- */}
      <Card>
        <form onSubmit={handleUpdateData}>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your name and email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* --- Form 2: Update Password --- */}
      <Card>
        <form onSubmit={handleUpdatePassword}>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>
              Enter your current and new password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserProfile;
