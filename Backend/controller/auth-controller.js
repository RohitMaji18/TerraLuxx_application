const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//helper function to generate sign JWT token--
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

//1---for user registration controller brother------------------------
exports.register = async (req, res) => {
  try {
    //import the data from req body;
    const { name, email, password, confirmPassword } = req.body;

    //validate the data
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    //check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      {
        return res.status(400).json({ message: "User already exits" });
      }
    }
    //hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); //10 is the salt rounds

    //create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    //save the user on the database
    await newUser.save();

    //generate a JWT token for the user
    const token = signToken(newUser._id);
    //send the response to the client

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        photo: newUser.photo,
      },
    });
  } catch (error) {
    console.error("Error during your registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//login controller---------------------------------------
//for user login brother
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate the data
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    //check if the user + password exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //check the password is correct
    const is_match = await user.correctPassword(password, user.password);
    if (!is_match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate a JWT token for the user ;
    const token = signToken(user._id);
    //send the response to the client

    res.status(200).json({
      message: "Login successful buddy",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);

    res.status(500).json({ message: "Server error" });
  }
};

//logut user controller--------------------------
//note:JWT token cannot be destroyed from the server side because JWT is stateless.
//but we can delete it from the client side by simply deleting the token from the local storage or cookie
//frontwend will handle the logout functionality by deleting the token from the local storage or cookie
exports.logout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

//for get me route ;
exports.getMe = async (req, res) => {
  try {
    // req.user is set in the authMiddleware after verifying the JWT token
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//for update me controller-------------------------
exports.updateMe = async (req, res) => {
  try {
    const { name, email, password, currentPassword, photo } = req.body;
    const updates = {}; //object to hold the fields to be updated
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (photo) updates.photo = photo;

    // If the user wants to update the password, ensure they provide the current password
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required to set new password",
        });
      }

      const user = await userModel.findById(req.user.id).select("+password");
      const is_match = await user.correctPassword(
        currentPassword,
        user.password
      );

      if (!is_match) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect Dost" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    updates.updatedAt = Date.now();

    // Update the user document in the database
    const updatedUser = await userModel
      .findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    res.status(200).json({
      message: "User data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
