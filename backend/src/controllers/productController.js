const productModel = require('../models/productModel');

// Create product
const createProduct = async (req, res) => {
  try {
    const result = await productModel.createProduct(req.body);
    if (result.affectedRows === 1) {
      const product = await productModel.getProductById(result.insertId);
      res.status(201).json(product);
    } else {
      res.status(500).json({ error: 'Failed to create product' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await productModel.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
  }
};

// Get product by id
const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product', details: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const result = await productModel.updateProduct(req.params.id, req.body);
    if (result.affectedRows === 1) {
      const product = await productModel.getProductById(req.params.id);
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const result = await productModel.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};



module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};