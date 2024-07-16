const CartItem = require("../models/cartItem.model");
const userService = require("./user.services");

// 12:40 #4
async function updateCartItem(userId, cartItemId, cartItemData) {
  console.log(userId, cartItemData, cartItemId);
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart Item not found", cartItemId);
    }

    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("user not found", userId);
    }

    if (userId.toString() === user._id.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const udpatedCartItem = await item.save();
      return udpatedCartItem;
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// // 24:37 #4
async function removeCartItem(userId, cartItemId) {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
      return await CartItem.findByIdAndDelete(cartItemId);
    } else {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// // 28:20 #4
async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem is not found with id", cartItemId);
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById };
