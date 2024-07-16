const express = require("express");
const router = express.Router();

// 2:22:10 #4
const authenticate = require("../middleware/authenticate");
const cartController = require("../controller/cart.controller");

router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);

module.exports = router