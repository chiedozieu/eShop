const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  mainCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  subSubCategory: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  // Add any other fields you need for your product
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;