// models/Product.js
// const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  mainCategory: { type: String, required: true },
  subCategory: { type: String },
  subSubCategory: { type: String },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  imageUrl: { type: String }, // URL to the uploaded product image
}, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);



// Controller


// Create a new product
// controllers/ProductController.js
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2; // for image upload to Cloudinary

// Create a new product
exports.createProductMightInterfere = async (req, res) => {
  try {
    const { name, description, mainCategory, subCategory, subSubCategory, stock, price, discount } = req.body;

    // Upload the image to Cloudinary (or use another image upload service)
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get URL of uploaded image
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      mainCategory,
      subCategory,
      subSubCategory,
      stock,
      price,
      discount,
      imageUrl,
    });

    // Save the product to the database
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message,
    });
  }
};


//Route

const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/ProductController');
const upload = require('../middleware/uploadMiddleware'); // Assuming you have a middleware for file upload

// router.post('/create', upload.single('image'), createProduct);

// module.exports = router;


//multer


// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Set storage engine using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Filter for file type (image only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter,
});

// module.exports = upload;