const pool = require('./db');

const createUser = async (user) => {
  const sql = 'INSERT INTO users SET ?';
  const [result] = await pool.query(sql, user);
  return result;
};

const getUsers = async () => {
  const sql = 'SELECT * FROM users';
  const [rows] = await pool.query(sql);
  return rows;
};

const getUserById = async (id) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

const updateUser = async (id, user) => {
  const sql = 'UPDATE users SET ? WHERE id = ?';
  const [result] = await pool.query(sql, [user, id]);
  return result;
};

const deleteUser = async (id) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};