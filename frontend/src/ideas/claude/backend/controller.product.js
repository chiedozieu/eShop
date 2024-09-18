const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path as needed

router.post('/create-product', async (req, res) => {
  try {
    const {
      mainCategory,
      subCategory,
      subSubCategory,
      name,
      description,
      price,
      stock,
    } = req.body;

    const newProduct = new Product({
      mainCategory,
      subCategory,
      subSubCategory,
      name,
      description,
      price,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;