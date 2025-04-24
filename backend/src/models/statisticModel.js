const pool = require('./db');

const createStatistic = async (statistic) => {
  const sql = 'INSERT INTO statistics_records SET ?';
  const [result] = await pool.query(sql, statistic);
  return result;
};

const getStatistics = async () => {
  const sql = 'SELECT * FROM statistics_records';
  const [rows] = await pool.query(sql);
  return rows;
};

const getStatisticById = async (id) => {
  const sql = 'SELECT * FROM statistics_records WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const updateStatistic = async (id, statistic) => {
  const sql = 'UPDATE statistics_records SET ? WHERE id = ?';
  const [result] = await pool.query(sql, [statistic, id]);
  return result;
};

const deleteStatistic = async (id) => {
  const sql = 'DELETE FROM statistics_records WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

module.exports = {
  createStatistic,
  getStatistics,
  getStatisticById,
  updateStatistic,
  deleteStatistic,
};