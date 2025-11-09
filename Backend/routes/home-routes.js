const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Welcome to TerraLux API");
});

module.exports = router;
