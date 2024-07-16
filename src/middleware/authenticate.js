// 2:10:34 #4

const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.services");
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    // console.log("headers:", req.headers);
    // const authHeader = req.headers.authorization;
    // console.log('authorization', authHeader);
    // const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(404).send({ error: "token not found" });
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = userService.findUserById(userId);
    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  next();
};

module.exports = authenticate;
