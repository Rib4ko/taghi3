const zakatModel = require('../models/zakatModel');
const statisticModel = require('../models/statisticModel');

const calculateZakat = async (req, res) => {
  try {
    const zakatData = await zakatModel.getZakats();
    if (!zakatData) {
      return res.status(404).json({ error: 'Zakat not found' });
    }
    res.status(200).json(zakatData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createZakat = async (req, res) => {
  try {
    const { userId, commercialRevenue, otherRevenue, debts, zakatAmount } = req.body;
    const newZakat = {
      userId,
      commercialRevenue,
      otherRevenue,
      debts,
      zakatAmount,
    };
    const result = await zakatModel.createZakat(newZakat);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getZakatById = async (req, res) => {
  try {
    const { id } = req.params;
    const zakat = await zakatModel.getZakatById(id);
    if (!zakat) {
      return res.status(404).json({ error: 'Zakat not found' });
    }
    res.status(200).json(zakat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateZakat = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, commercialRevenue, otherRevenue, debts, zakatAmount } = req.body;
    const updatedZakat = {
      userId,
      commercialRevenue,
      otherRevenue,
      debts,
      zakatAmount,
    };
    const result = await zakatModel.updateZakat(id, updatedZakat);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteZakat = async (req, res) => {
  try {
    const { id } = req.params;
    await zakatModel.deleteZakat(id);
    res.status(200).json({ message: 'Zakat deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Statistics Controller
const getStatistics = async (req, res) => {
  try {
    const statistics = await statisticModel.getStatistics();
    if (!statistics) {
      return res.status(404).json({ error: 'Statistics not found' });
    }
    res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createStatistic = async (req, res) => {
  try {
    const { recordDate, totalRevenue, ordersPerDay, bestSellingProduct, leastSellingProduct, loyalClient, clientsWithDebts, averageCart, CLV, conversionRate, lowStockAlert, bestCategory } = req.body;
    const newStatistic = {
      recordDate,
      totalRevenue,
      ordersPerDay,
      bestSellingProduct,
      leastSellingProduct,
      loyalClient,
      clientsWithDebts,
      averageCart,
      CLV,
      conversionRate,
      lowStockAlert,
      bestCategory,
    };
    const result = await statisticModel.createStatistic(newStatistic);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStatisticById = async (req, res) => {
  try {
    const { id } = req.params;
    const statistic = await statisticModel.getStatisticById(id);
    if (!statistic) {
      return res.status(404).json({ error: 'Statistic not found' });
    }
    res.status(200).json(statistic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateStatistic = async (req, res) => {
  try {
    const { id } = req.params;
    const { recordDate, totalRevenue, ordersPerDay, bestSellingProduct, leastSellingProduct, loyalClient, clientsWithDebts, averageCart, CLV, conversionRate, lowStockAlert, bestCategory } = req.body;
    const updatedStatistic = {
      recordDate,
      totalRevenue,
      ordersPerDay,
      bestSellingProduct,
      leastSellingProduct,
      loyalClient,
      clientsWithDebts,
      averageCart,
      CLV,
      conversionRate,
      lowStockAlert,
      bestCategory,
    };
    const result = await statisticModel.updateStatistic(id, updatedStatistic);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteStatistic = async (req, res) => {
  try {
    const { id } = req.params;
    await statisticModel.deleteStatistic(id);
    res.status(200).json({ message: 'Statistic deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  calculateZakat,
  createZakat,
  getZakatById,
  updateZakat,
  deleteZakat,
  getStatistics,
  createStatistic,
  getStatisticById,
  updateStatistic,
  deleteStatistic,
};