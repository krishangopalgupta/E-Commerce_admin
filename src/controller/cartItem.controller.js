const cartItemService = require("../services/cartItem.services");

// 1:44:00 #4
const updatedCartItem = async (req, res) => {
  const user = await req.user;
  try {
    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// 1:46:00 #4
const removeCartItem = async (req, res) => {
  const user = await req.user;
  try {
    const updatedCartItem = await cartItemService.removeCartItem(
      user._id,
      req.params.id
    );
    return res.status(200).send("cartitem removed Succesfully");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { updatedCartItem, removeCartItem };
