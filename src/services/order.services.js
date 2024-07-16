// 31:00 #4
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const cartService = require("../services/cart.services");

async function createOrder(user, shippAddress) {
  let address;
  console.log('shippAdress', shippAddress);
  if (shippAddress._id) {
    let existAddress = await Address.findById(shippAddress._id);
    address = existAddress;
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();

    console.log('user.address', user.address);
    user.address.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (let item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  //   38:24
  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shippAddress: address,
  });

  const savedOrder = await createdOrder.save();

  return savedOrder;
}

// const Address = require("../models/address.model");
// const Order = require("../models/order.model");
// const OrderItem = require("../models/orderItem.model");
// const cartService = require("../services/cart.services");

// async function createOrder(userPromise, shippAddress) {
//   try {
//     const user = await userPromise; // Resolve the user promise
//     console.log('Resolved user:', user);
//     console.log('Shipping address received:', shippAddress);

//     // Ensure all required address fields are present
//     const requiredFields = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zipcode', 'mobile'];
//     for (const field of requiredFields) {
//       if (!shippAddress[field]) {
//         throw new Error(`Path \`${field}\` is required.`);
//       }
//     }

//     let address;

//     if (shippAddress._id) {
//       address = await Address.findById(shippAddress._id);
//       if (!address) {
//         throw new Error('Address not found');
//       }
//     } else {
//       address = new Address(shippAddress);
//       address.user = user._id; // Ensure user ID is set
//       await address.save();

//       if (!user.address) {
//         user.address = [];
//       }
//       user.address.push(address._id); // Ensure user addresses are updated
//       await user.save();
//     }

//     const cart = await cartService.findUserCart(user._id);
//     if (!cart) {
//       throw new Error('Cart not found');
//     }
//     console.log('Cart found:', cart);

//     const orderItems = [];
//     for (let item of cart.cartItems) {
//       const orderItem = new OrderItem({
//         price: item.price,
//         product: item.product,
//         quantity: item.quantity,
//         userId: item.userId,
//         discountedPrice: item.discountedPrice,
//       });

//       const createdOrderItem = await orderItem.save();
//       orderItems.push(createdOrderItem);
//     }

//     const createdOrder = new Order({
//       user: user._id,
//       orderItems,
//       totalPrice: cart.totalPrice,
//       totalDiscountedPrice: cart.totalDiscountedPrice,
//       discount: cart.discount,
//       totalItem: cart.totalItem,
//       shippAddress: address._id,
//     });

//     const savedOrder = await createdOrder.save();
//     console.log('Order created:', savedOrder);
//     return savedOrder;
//   } catch (error) {
//     console.error('Error creating order:', error.message);
//     throw new Error(error.message);
//   }
// }



// 42:00 #4
async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";
  return await order.save();
}

// 43:00 #4
async function confirmedOrder(orderId) {
  // function given below at line 98
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}

// 44:00 #4
async function shipOrder(orderId) {
  // function given below at line 98
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}

// 44:30:00 #4
async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
}

// async function deliverOrder(orderId) {
// he wrote above function name
async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";
  return await order.save();
}

// 45:00
async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    // didn't understand the below line
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

// 50:07 #4
async function getAllOrders(userId) {
  try {
    return await Order.find()
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
