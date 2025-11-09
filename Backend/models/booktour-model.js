const mongoose = require("mongoose");

const bookTourSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("BookTour", bookTourSchema);
