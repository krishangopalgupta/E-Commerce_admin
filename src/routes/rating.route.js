const express = require("express");
const router = express.Router();

// 2:34:12
const ratingController = require("../controller/rating.controller");
const authenticate = require("../middleware/authenticate");

router.post("/creates", authenticate, ratingController.createRating);
router.post("/product/:productId", authenticate, ratingController.getAllRating);

module.exports = router;
