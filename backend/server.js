const bcrypt = require('bcrypt');
const pool = require('src/models/db');
const userModel = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email,
      password: hashedPassword,
      role,
    };

    const result = await userModel.createUser(newUser);
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, role } = req.body;
     let hashedPassword;
     if(password){
         const saltRounds = 10;
         hashedPassword = await bcrypt.hash(password, saltRounds);
     }
    const updatedUser = {
      email,
      password: hashedPassword,
      role,
    };
    const result = await userModel.updateUser(id, updatedUser);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModel.deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user: {
        id:user.id,
        email: user.email,
        role: user.role
    } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const register = async (req, res) => {
   try {
       const { email, password, role } = req.body;

       const existingUser = await userModel.getUserByEmail(email);
       if (existingUser) {
           return res.status(409).json({ error: 'User already exists' });
       }
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password, saltRounds);

       const newUser = {
           email,
           password: hashedPassword,
           role,
       };

       const result = await userModel.createUser(newUser);
       res.status(201).json({ message: 'User registered', user: {
               id: result.insertId,
               email: newUser.email,
               role: newUser.role
           } });
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
    register
};