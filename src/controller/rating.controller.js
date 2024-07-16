const ratingService = require("../services/rating.services");

// 2:07:02
const createRating = async (req, res) => {
  const user = req.user;
  try {
    const review = await ratingService.createRating(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// 2:08:00
const getAllRating = async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;
  try {
    // looks like problem in getAllRating he wrote this line
    // const reviews = await ratingService.getAllRating(productId);

    const reviews = await ratingService.getProductRating(productId);
    return res.status(201).send(reviews);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createRating,
  getAllRating,
};
