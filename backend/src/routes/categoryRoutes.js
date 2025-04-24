const express = require('express')
const router = express.Router()

// Import controller
const categoryController = require('../controllers/categoryController')

// Routes
router.post('/', categoryController.createCategory)
router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router