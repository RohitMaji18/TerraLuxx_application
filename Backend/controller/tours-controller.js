const Tour = require("../models/tours-model.js");

//get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
//get a single tour by ID

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOne({ _id: id });
    if (!tour) {
      return res.status(404).json({
        status: "error",
        message: "Tour not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
