import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

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
      ...specifications
    } = req.body;

    const newProduct = new Product({
      mainCategory,
      subCategory,
      subSubCategory,
      name,
      description,
      price,
      stock,
      specifications
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;