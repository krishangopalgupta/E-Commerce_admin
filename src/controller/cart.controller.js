const cartService = require("../services/cart.services");

// 1:35:00 #4
const findUserCart = async (req, res) => {
  const user = await req.user;
  try {
    const cart = await cartService.findUserCart(user._id);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// 1:41:11 #4
const addItemToCart = async (req, res) => {
  const user = await req.user;
  console.log('user', user);
  try {
    const cartItem = await cartService.addCartItem(user._id, req.body);
    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { findUserCart, addItemToCart };


// const cartService = require("../services/cart.services");

// const findUserCart = async (req, res) => {
//   const user = await req.user;
//   try {
//     const cart = await cartService.findUserCart(user._id);
//     console.log(cart);
//     return res.status(200).send(cart);
//     return cart;
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// const addItemToCart = async (req, res) => {
//   const user = await req.user;
//   console.log(user);
//   try {
//     const cartItem = await cartService.addCartItem(user._id, req.body);
//     return res.status(200).send(cartItem);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// module.exports = { findUserCart, addItemToCart };
