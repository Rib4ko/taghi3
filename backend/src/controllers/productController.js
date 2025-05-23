const productModel = require('../models/productModel');
const mongoose = require('mongoose');

// Create product
const createProduct = async (req, res) => {
  try {
      const { name, description, price, stock, sellerId, costPrice, categoryId } = req.body;
      const productData = { name, description, price, stock, sellerId, costPrice, categoryId };

    const result = await productModel.createProduct(productData);
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
    const { category } = req.query;
    let filter = {};
    if(category){
      filter = {category: new mongoose.Types.ObjectId(category)}
    }
    const products = await productModel.getProducts(filter).populate('category');
    const productsToSend = products.map((product) => {
      return {
        id: product._id,
        title: product.name,
        description: product.description,
        price: product.price,
        category: product.category
      }
    })
    res.status(200).json(productsToSend);
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

// Search products
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const products = await productModel.searchProducts(query);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search products', details: error.message });
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
  searchProducts,
};