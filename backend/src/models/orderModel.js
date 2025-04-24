const pool = require('./db');

const createOrdersTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    productIds JSON,
    quantities JSON,
    total DECIMAL(10, 2) NOT NULL,
    customerName VARCHAR(255) NOT NULL);`;
  await pool.query(sql);
};

const createOrder = async (order) => {
  const sql = 'INSERT INTO orders SET ?';
  const [result] = await pool.query(sql, order);
  return result;
};

const getOrders = async () => {
  const sql = 'SELECT * FROM orders';
  const [rows] = await pool.query(sql);
  return rows;
};

const getOrderById = async (id) => {
  const sql = 'SELECT * FROM orders WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const updateOrder = async (id, order) => {
  const sql = 'UPDATE orders SET ? WHERE id = ?';
  const [result] = await pool.query(sql, [order, id]);
  return result;
};

const deleteOrder = async (id) => {
  const sql = 'DELETE FROM orders WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

createOrdersTable();

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};