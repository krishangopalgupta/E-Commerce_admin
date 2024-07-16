const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  level: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
