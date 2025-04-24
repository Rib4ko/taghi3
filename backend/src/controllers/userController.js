const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register user
const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const user = { email, password: hashedPassword, role };
    const result = await userModel.createUser(user);

    res.status(201).json({ message: 'User created', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Logged in', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create user (For admin)
const createUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await userModel.createUser(user);
    res.status(201).json({ message: 'User created', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user by id
const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const result = await userModel.updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'User updated', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const result = await userModel.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  createUser,
  getUsers,
  getUserById,register,login,
  updateUser,
  deleteUser,
};