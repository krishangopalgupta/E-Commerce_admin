// After that all the controller used by user not an admin
const orderService = require("../services/order.services");

// 1:49:12 #4
const createOrder = async (req, res) => {
  const user = await req.user;
  try {
    console.log("Request Body:", req.body); // Log the request body to debug

    let createdOrder = await orderService.createOrder(user, req.body);
    return res.status(201).send(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error.message); // Log the error message
    return res.status(500).send({ error: error.message });
  }
};

// 1:51:00 #4
const findOrderById = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await orderService.findOrderById(req.params.id);
    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// 1:52:00 #4
const orderHistory = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await orderService.usersOrderHistory(req.params.id);
    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  orderHistory,
};
