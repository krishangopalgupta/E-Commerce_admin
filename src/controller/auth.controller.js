const userService = require("../services/user.services.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require('../services/cart.services.js')

const register =  async (req, res) => {
  try {
    const user = await userService.createUser(req.body); // await added
    const jwt = jwtProvider.generateToken(user._id);

    await cartService.createCart(user._id); // user._id instead of user

    return res.status(200).send({ jwt, message: "register successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "user is not existed with this email:", email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).send({ message: "Invalid password" });
    }

    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "login Success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};



// auth.controller.js

// const userService = require("../services/user.services.js");
// const jwtProvider = require("../config/jwtProvider.js");
// const bcrypt = require("bcrypt");
// const cartService = require('../services/cart.services.js');

// const register = async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body); // Await here
//     const jwt = jwtProvider.generateToken(user._id);

//     await cartService.createCart(user._id); // Pass user._id instead of user

//     return res.status(200).send({ jwt, message: "Register successfully" });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// const login = async (req, res) => {
//   const { password, email } = req.body;
//   try {
//     const user = await userService.getUserByEmail(email);
//     if (!user) {
//       return res
//         .status(404)
//         .send({ message: "User does not exist with this email", email });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(404).send({ message: "Invalid password" });
//     }

//     const jwt = jwtProvider.generateToken(user._id);
//     return res.status(200).send({ jwt, message: "Login success" });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// module.exports = {
//   register,
//   login,
// };
