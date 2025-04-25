const connection = require('../db');
const bcrypt = require('bcrypt');

const createUsersTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
        resetToken VARCHAR(255),
        resetTokenExpiry TIMESTAMP,
        role ENUM('admin', 'seller', 'client') NOT NULL DEFAULT 'client',
        isActive BOOLEAN DEFAULT TRUE,
        source VARCHAR(255)
    )`;
  await connection.execute(sql);
};

const createUser = async (user, role = 'client') => {
    const sql = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(sql, [user.username, user.password, user.email, role]);
  return result;
};

const getUsers = async () => {
  const sql = 'SELECT id, username, email, role, isActive, source FROM users';
  const [rows] = await connection.execute(sql);
  return rows;
};

const getUserById = async (id) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const getUserByUsername = async (username) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await connection.execute(sql, [username]);
  return rows[0];
};

const updateUser = async (id, user) => {
    const sql = 'UPDATE users SET ? WHERE id = ?';
    const [result] = await connection.execute(sql, [user, id]);
  return result;
};

const deleteUser = async (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [result] = await connection.execute(sql, [id]);
  return result;
};

const generateResetToken = async (userId) => {
    const token = require('crypto').randomBytes(20).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour
  const sql = 'UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE id = ?';
    await connection.execute(sql, [token, expiry, userId]);
    return token;
};

const getUserByResetToken = async (token) => {
  const sql = 'SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > NOW()';
  const [rows] = await connection.execute(sql, [token]);
  return rows[0];
};

const updatePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const sql = 'UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?';
    await connection.execute(sql, [hashedPassword, userId]);
};








createUsersTable();

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  generateResetToken,
  getUserByResetToken,
  updatePassword,
};