import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description!"],
  },
  category: {
    type: String,
    required: [true, "Please select product category!"],
  },
  tags: {
    type: String,
  },
  location: {
    type: String,
  },

  discountPrice: {
    type: Number,
    required: [true, "Please enter product price!"],
  },

  stock: {
    type: Number,
  },
  images: [
    {
      type: String,
      required: [true, "Please upload image"],
    },
  ],

  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
