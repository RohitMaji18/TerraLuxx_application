const express = require("express");
const connectDB = require("./config/db");
const UserModel = require("./models/user-model");
const homeRoutes = require("./routes/home-routes");
const userRoutes = require("./routes/user-routes");
const tourRoutes = require("./routes/tour-routes");
const cors = require("cors");

// Initialize Express
const app = express();
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

//static files
app.use(express.static("public"));

//all routes
app.use("/api/v1", homeRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", tourRoutes);

//connect server
const Port = 3000;
app.listen(Port, () => {
  console.log(`server is running on port-> ${Port}`);
});
