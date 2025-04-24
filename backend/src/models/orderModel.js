const pool = require('./db');

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

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};