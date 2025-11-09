const express = require("express");
const tourController = require("../controller/tours-controller.js");

const router = express.Router();

router.route("/tours").get(tourController.getAllTours);
router.route("/tours/:id").get(tourController.getById);

module.exports = router;
