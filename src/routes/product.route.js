const express = require("express");
const router = express.Router();

// 2:30:12 #4
const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, productController.getAllProducts);
router.get("/id/:id", authenticate, productController.findProductById);

module.exports = router;
