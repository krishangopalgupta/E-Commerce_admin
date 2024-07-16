const jwt = require("jsonwebtoken");

const SECRET_KEY = "9f8ksjiusdfoisudfsd9f8s0f9s8adf0sadf8sdf0s";
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  console.log(token);
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };