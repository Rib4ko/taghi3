const express = require('express');
const router = express.Router();

// Import controller
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, searchProducts } = require('../controllers/productController');

// Routes
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/search', searchProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;