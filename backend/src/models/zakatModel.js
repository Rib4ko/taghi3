const pool = require('./db');

const createZakat = async (zakat) => {
  const sql = 'INSERT INTO zakat_records SET ?';
  const [result] = await pool.query(sql, zakat);
  return result;
};

const getZakats = async () => {
  const sql = 'SELECT * FROM zakat_records';
  const [rows] = await pool.query(sql);
  return rows;
};

const getZakatById = async (id) => {
  const sql = 'SELECT * FROM zakat_records WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const updateZakat = async (id, zakat) => {
  const sql = 'UPDATE zakat_records SET ? WHERE id = ?';
  const [result] = await pool.query(sql, [zakat, id]);
  return result;
};

const deleteZakat = async (id) => {
  const sql = 'DELETE FROM zakat_records WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

module.exports = {
  createZakat,
  getZakats,
  getZakatById,
  updateZakat,
  deleteZakat,
};