const { getUserIdFromToken } = require("../config/jwtProvider");
const jwtProvider = require('../config/jwtProvider.js')
const User = require("../models/user.models");
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User is already exist", email);
    }
    const newPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ firstName, lastName, email, password:newPassword });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("UserId is not exist with userId", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email  });
    if (!user) {
      throw new Error("UserId is not exist with email", email);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    // he's using this
     const userId = jwtProvider.getUserIdFromToken(token);

    // I'm using this because we're already exporting function
    // const userId = getUserIdFromToken(token);

    const user = await findUserById(userId);
    if (!user) {
      throw new Error("UserId is not exist with userId", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// 1:16:01

const getAllUsers = async () => {
  try {
    const users = await User.find();
     return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
