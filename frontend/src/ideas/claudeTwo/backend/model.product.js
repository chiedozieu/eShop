import mongoose from 'mongoose';

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
  specifications: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  // Add any other fields you need for your product
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;


//To make this work with your backend, you'll need to update your Product model to accommodate these dynamic fields. One way to do this is by adding a specifications field to your Product model that can store these additional attributes: