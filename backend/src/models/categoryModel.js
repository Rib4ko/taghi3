const pool = require('./db');

const createCategory = async (category) => {
  const sql = 'INSERT INTO categories SET ?';
  const [result] = await pool.query(sql, category);
  return result;
};

const getCategories = async () => {
  const sql = 'SELECT * FROM categories';
  const [rows] = await pool.query(sql);
  return rows;
};

const getCategoryById = async (id) => {
  const sql = 'SELECT * FROM categories WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const updateCategory = async (id, category) => {
  const sql = 'UPDATE categories SET ? WHERE id = ?';
  const [result] = await pool.query(sql, [category, id]);
  return result;
};

const deleteCategory = async (id) => {
  const sql = 'DELETE FROM categories WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};