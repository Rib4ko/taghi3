const pool = require('./db');

const createProduct = async (product) => {
  const sql = 'INSERT INTO products SET ?';
  const [result] = await pool.query(sql, product);
  return result;
};

const getProducts = async () => {
  const sql = 'SELECT * FROM products';
  const [rows] = await pool.query(sql);
  return rows;
};

const getProductById = async (id) => {
  const sql = 'SELECT * FROM products WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const updateProduct = async (id, product) => {
  const sql = 'UPDATE products SET ? WHERE id = ?';
  const [result] = await pool.query(sql, [product, id]);
  return result;
};

const deleteProduct = async (id) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};