const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const orderController = require("../controller/order.controller");

router.post("/", authenticate, orderController.createOrder);

// name is userOrdersHistory to orderHistory
router.post("/", authenticate, orderController.orderHistory);

router.get("/user", authenticate, orderController.findOrderById);

module.exports = router;
