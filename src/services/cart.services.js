const Cart = require("../models/cart.model");
const cartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(userId) {
  try {
    const cart = new Cart({ user: userId });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  try {
    let cart = await Cart.findOne({ user: userId });
    let cartItems = await cartItem.find({ cart: cart._id }).populate("product");
    console.log('this is cart Item', cartItems);

    if (!cart) {
      throw new Error("Cart not found for this user");
    }

    cart.cartItems = cartItems;
    console.log('cart.cartItems', cart.cartItems);
    
    let totalPrice = 0,
      totalDiscountedPrice = 0,
      totalItem = 0;

    for (let item of cart.cartItems) {
      totalPrice += item.price;
      totalDiscountedPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discount = totalPrice - totalDiscountedPrice;
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}



async function addCartItem(userId, req) {
  try {
    let cart = await Cart.findOne({ user: userId });
    let product = await Product.findById(req.productId);

    if (!cart) {
      throw new Error("Cart not found for this user");
    }
    
    console.log("this is product", product);
    
    let isPresent = await cartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    
    if (!isPresent) {
      const newCartItem = new cartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        discountedPrice: product.discountedPrice,
      });
      
      const createdCartItem = await newCartItem.save();
      console.log('createdCartItem', createdCartItem);
      
      cart.cartItems.push(createdCartItem);
      await cart.save();
    }
    
    return "Item added to cart";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createCart, findUserCart, addCartItem };



// async function findUserCart(userId) {
//   try {
//     let cart = await Cart.findOne({ user: userId })
//       .populate({
//         path: 'cartItems',
//         populate: { path: 'product' } // Populate nested fields if necessary
//       });

//     if (!cart) {
//       throw new Error("Cart not found for this user");
//     }

//     // Calculate totals or other operations if needed
//     let totalPrice = 0,
//       totalDiscountedPrice = 0,
//       totalItem = 0;

//     for (let item of cart.cartItems) {
//       totalPrice += item.price;
//       totalDiscountedPrice += item.discountedPrice;
//       totalItem += item.quantity;
//     }

//     cart.totalPrice = totalPrice;
//     cart.totalItem = totalItem;
//     cart.discount = totalPrice - totalDiscountedPrice;

//     return cart;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }