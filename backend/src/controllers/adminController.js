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

// New function to get dashboard statistics
const getDashboardStatistics = async (req, res) => {
  try {
     const today = new Date();
    const currentYear = today.getFullYear();
    const startDate = new Date(currentYear, 0, 1); // First day of the current year
    const endDate = today;

    const totalUsers = await statisticModel.getTotalUsers();
    const totalProducts = await statisticModel.getTotalProducts();
    const totalOrders = await statisticModel.getTotalOrders();
    const revenueByPeriod = await statisticModel.getRevenueByPeriod(startDate, endDate);
    const bestSellingProducts = await statisticModel.getBestSellingProducts();
    const loyalClients = await statisticModel.getLoyalClients();
    const lowStockAlerts = await statisticModel.getLowStockAlerts();
    const ordersByPeriod = await statisticModel.getOrdersByPeriod(startDate, endDate);
    const revenueBySeller = await statisticModel.getRevenueBySeller();
    const partialOrUnpaidPayments = await statisticModel.getPartialOrUnpaidPayments();
    const paymentDistribution = await statisticModel.getPaymentDistribution();
    const activeOrInactiveClients = await statisticModel.getActiveOrInactiveClients();
    const averageCart = await statisticModel.getAverageCart();
    const clientLifetimeValue = await statisticModel.getClientLifetimeValue();
    const conversionRate = await statisticModel.getConversionRate();
    const leastSellingProducts = await statisticModel.getLeastSellingProducts();
    const bestCategory = await statisticModel.getBestCategory();
     const salesTrend = await statisticModel.getSalesTrend(startDate, endDate);
     const newVsReturningCustomers = await statisticModel.getNewVsReturningCustomers();
     const customerChurnRate = await statisticModel.getCustomerChurnRate();
      const profitMarginPerProduct = await statisticModel.getProfitMarginPerProduct();
       const abandonedCartRate = await statisticModel.getAbandonedCartRate();
         const mostCommonCustomerServiceIssues = await statisticModel.getMostCommonCustomerServiceIssues();
         const productPopularityOverTime = await statisticModel.getProductPopularityOverTime();
           const customerSegmentation = await statisticModel.getCustomerSegmentation();
           const websiteAppPerformance = await statisticModel.getWebsiteAppPerformance();
           const salesBySource = await statisticModel.getSalesBySource();

    res.status(200).json({
      totalUsers, totalProducts, totalOrders, revenueByPeriod, bestSellingProducts,
      loyalClients, lowStockAlerts, ordersByPeriod, revenueBySeller,
      partialOrUnpaidPayments, paymentDistribution, activeOrInactiveClients,
      averageCart, clientLifetimeValue, conversionRate, leastSellingProducts, salesTrend,
      bestCategory
        , newVsReturningCustomers, customerChurnRate, profitMarginPerProduct, abandonedCartRate, mostCommonCustomerServiceIssues, productPopularityOverTime, customerSegmentation, websiteAppPerformance, salesBySource });

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
  getDashboardStatistics,
};