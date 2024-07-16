const Category = require("../models/category.model");
const Product = require("../models/product.model");

// 54:00 #4
// create product
async function createProduct(reqData) {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
    // await topLevel.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
    // await secondLevel.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
    // await thirdLevel.save();
  }

  console.log(topLevel);
  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    // size is removed here
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
  // return product;
}

// 1:04:12 #4
// deleteProduct
async function deleteProduct(productId) {
  const product = await findProductById(productId);

  await Product.findByIdAndDelete(productId);
  return "Product deleted Successfully";
}

// deleteProduct
async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

// findProductById
async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("product not found with id " + id);
  }
  return product;
}

// 1:07:10 #4
// getAllProducts
async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });

    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], curentPage: 1, totalPages: 0 };
    }
  }

  // 1:13:00 #4
  // white, black, orange
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    query = query.where("color").regex(colorRegex);
  }

  //   Sizewise category
  //   if (sizes) {
  //     const sizesSet = new Set(sizes);
  //     query.query.where("size.name").in([...sizesSet]);
  //   }

  //   find by minPrice and maxPrice
  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  //   find by minDiscount
  if (minDiscount) {
    query = query.where("discountPercent").gt(minDiscount);
  }

  //   find by stock
  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock == "out_of_stock") {
      query = (await query.where("quantity")).gt(0);
    }
  }

  //   sort by price (high to low || low to high) 1:21:22
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);
  return { content: products, currentPage: pageNumber, totalPages };
}

// 1:25:00 #4
// createMultipleProduct
async function createMultipleProduct(product) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  createMultipleProduct,
  getAllProducts,
};
