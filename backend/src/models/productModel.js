const pool = require('./db');

const createProductsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL, 
        category VARCHAR(255),
        quantity INT)`;
  await pool.query(sql);
};

const createProduct = async (product, categoryId) => {
    const newProduct = {
        ...product,
        categoryId: categoryId
    };
    const sql = 'INSERT INTO products SET ?';

  const [result] = await pool.query(sql, newProduct);
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

const searchProducts = async (query) => {
  const sql = `SELECT * FROM products WHERE name LIKE ? OR description LIKE ?`;
  const likeQuery = `%${query}%`;
  const [rows] = await pool.query(sql, [likeQuery, likeQuery]);
  return rows;
};


const deleteProduct = async (id) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

 
createProductsTable();

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};