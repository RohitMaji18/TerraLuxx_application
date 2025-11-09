const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

// Middleware to protect routes that require authentication
exports.protect = async (req, res, next) => {
  try {
    //1 Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    //console.log("authHeader:", authHeader); //debugging line
    // Check if the header is present and properly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }
    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    //2 Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //3 chec1k if the user still exists
    const currentUser = await userModel.findById(decoded.id);

    if (!currentUser) {
      return res
        .status(401)
        .json({ message: "user belonging to this token no longer exists" });
    }

    //4 attach the user to the request object
    req.user = currentUser;
    //grant access to the protected route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to restrict access based on user roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array of allowed roles, e.g., ['admin', 'user']
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};
