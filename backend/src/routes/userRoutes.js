const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', authMiddleware, userController.getAllUsers);

// Get a user by ID
router.get('/:id', authMiddleware, userController.getUserById);

// Update a user
router.put('/:id', authMiddleware, userController.updateUser);

// Delete a user
router.delete('/:id', authMiddleware, userController.deleteUser);

// Login and logout route
router.post('/login', userController.login);
router.post('/logout', userController.logout);
module.exports = router;