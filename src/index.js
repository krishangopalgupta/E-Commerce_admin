const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send({ message: "Welcome to e-commerce", status: true });
});

const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route.js");
app.use("/api/users", userRouters);

// 2:38:00 #4
const productRouter = require("./routes/product.route.js");
app.use("/api/products", productRouter);

const adminProductRouter = require("./routes/adminProduct.route.js");
app.use("/api/admin/products", adminProductRouter);

// 2:43:09 #4
const adminOrderRouter = require("./routes/adminOrder.route.js");
app.use("/api/admin/orders", adminOrderRouter);

// 2:39:00 #4
const cartRouter = require("./routes/cart.route.js");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.route.js");
app.use("/api/cart_items", cartItemRouter);

// 2:40:00 #4
const orderRouter = require("./routes/order.route.js");
app.use("/api/orders", orderRouter);

const reviewRouter = require("./routes/review.route.js");
app.use("/api/review", reviewRouter);

const ratingRouter = require("./routes/rating.route.js");
app.use("/api/rating", ratingRouter);

module.exports = app;

// 9ENX2Pf3ixarqYlf
