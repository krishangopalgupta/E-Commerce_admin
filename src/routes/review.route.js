const express = require("express");
const router = express.Router();

// 2:32:12
const reviewController = require("../controller/review.controller");
const authenticate = require("../middleware/authenticate");

router.post("/creates", authenticate, reviewController.createReview);
router.post("/product/:productId", authenticate, reviewController.getAllReview);

module.exports = router;
