const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    _id: Number,

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    maxGroupSize: {
      type: Number,
      required: true,
    },
    availableDates: [
      {
        type: Date,
        required: true,
      },
    ],
    image: [{ type: String, required: true }],

    rating: {
      type: Number,
      default: 0,
    },

    highlights: [
      {
        type: String,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);
const TourModel = mongoose.model("Tour", TourSchema);
module.exports = TourModel;
