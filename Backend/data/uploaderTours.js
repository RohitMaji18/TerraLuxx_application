require("dotenv").config();
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);
// <-- add this line
const connectDB = require("../config/db.js"); // DB connection
const Tour = require("../models/tours-model.js");
const tours = require("./tours-data.js"); // <-- import JS file

// Connect to DB
connectDB();

const importData = async () => {
  try {
    await Tour.insertMany(tours); // Insert array of tours
    console.log("✅ Data imported successfully!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

importData();
