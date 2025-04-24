const express = require('express');
const router = express.Router();

// Import controller
const userController = require('../controllers/userController');

// User Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/', userController.getUsers); // Example: get all users
router.get('/:id', userController.getUserById); // Example: get user by id
router.put('/:id', userController.updateUser); // Example: update user
router.delete('/:id', userController.deleteUser); // Example: delete user



module.exports = router;