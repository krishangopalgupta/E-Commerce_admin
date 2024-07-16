const express = require("express");
const router = express.Router();

// 2:24:37 #4
const cartItemController = require("../controller/cartItem.controller");
const authenticate = require("../middleware/authenticate");

router.put("/:id", authenticate, cartItemController.updatedCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem);

module.exports = router;
