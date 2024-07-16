// 1:29:56 #4
const Rating = require("../models/rating.model");
const ProductService = require("../services/product.services");

async function createRating(req, user) {
  const product = await ProductService.findProductById(req.productId);

  const rating = new Rating({
    product: product._id,
    user: user._id,
    rating: req.rating,
    createdAt: new Date(),
  });
  return await rating.save();
}

async function getProductRating(productId) {
  return await Rating.find({ product: productId });
}

module.exports = {
  createRating,
  getProductRating,
};
