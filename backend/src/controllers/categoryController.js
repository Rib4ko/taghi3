const categoryModel = require('../models/categoryModel');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = { name, description };
    const result = await categoryModel.createCategory(category);
    res.status(201).json({ id: result.insertId, ...category, message: 'Category created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve categories', details: error.message });
  }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.getCategoryById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve category', details: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const category = { name, description };
    const result = await categoryModel.updateCategory(id, category);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await categoryModel.deleteCategory(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};