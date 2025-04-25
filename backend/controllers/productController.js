// Assuming this is in your backend (e.g., a file like productController.js)

const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    
    const product = new Product({
      title,
      description,
      price,
      category,
    });

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const fileExtension = path.extname(imageFile.name);
      const newFileName = `${product._id}${fileExtension}`;
      const uploadPath = path.join(__dirname, '../uploads', newFileName); // Correct path to uploads

      // Ensure the uploads directory exists
      if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
        fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true });
      }

      await imageFile.mv(uploadPath);
      
      // Construct image URL
      product.image = `/uploads/${newFileName}`; // Relative path for the client
    }

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get products' });
  }
};

const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get product' });
    }
  };
const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;

    if (req.files && req.files.image) {
      if (product.image) {        
        const oldImageName = product.image.split('/').pop();
        const oldImagePath = path.join(__dirname, '../uploads', oldImageName);
    
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log(`Deleted old image: ${oldImagePath}`);
        }
      }

      const imageFile = req.files.image;
      const fileExtension = path.extname(imageFile.name);
      const newFileName = `${product._id}${fileExtension}`;
      const uploadPath = path.join(__dirname, '../uploads', newFileName);

      await imageFile.mv(uploadPath);
      product.image = `/uploads/${newFileName}`;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct
};