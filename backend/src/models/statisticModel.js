const connection = require('./db');

const createTableSeller = `CREATE TABLE IF NOT EXISTS seller_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statisticName VARCHAR(255) NOT NULL,
    isVisible BOOLEAN NOT NULL DEFAULT FALSE,
    sellerId INT,
    FOREIGN KEY (sellerId) REFERENCES users(id)
);`;

connection.execute(createTableSeller)
.then(() => console.log("Table created"))
.catch((error) => console.log("Error creating table : ", error))


const insertInitialSellerStatistics = async () => {
  try {
    const [existingRows] = await connection.execute('SELECT COUNT(*) AS count FROM seller_statistics');
    if (existingRows[0].count === 0) {
      const initialStatistics = ['getRevenueByPeriod','getSalesTrend','getOrdersByPeriod','getBestSellingProducts','getLeastSellingProducts','getProfitMarginPerProduct','getProductPopularityOverTime','getLowStockAlerts','getRevenueBySeller'];
      for (const statisticName of initialStatistics) {       
        await connection.execute('INSERT INTO seller_statistics (statisticName, isVisible, sellerId) VALUES (?, ?, ?)', [statisticName, true, null]);
        
      }
    }
    } catch (error) {
    console.error('Error inserting initial seller statistics:', error);
    throw error;
  }
};
insertInitialSellerStatistics();

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

// Get the total number of users
const getTotalUsers = async () => {
    const sql = 'SELECT COUNT(*) as totalUsers FROM users';
    const [rows] = await pool.query(sql);
    return rows[0].totalUsers;
};

// Get the total number of products
const getTotalProducts = async () => {
    const sql = 'SELECT COUNT(*) as totalProducts FROM products';
    const [rows] = await pool.query(sql);
    return rows[0].totalProducts;
};

// Get the total number of orders
const getTotalOrders = async () => {
    const sql = 'SELECT COUNT(*) as totalOrders FROM orders';
    const [rows] = await pool.query(sql);
    return rows[0].totalOrders;
};

const getRevenueByPeriod = async (startDate, endDate) => {
  const sql = `
    SELECT DATE(orderDate) as date, SUM(totalPrice) as revenue
    FROM orders
    WHERE orderDate >= ? AND orderDate <= ?
    GROUP BY DATE(orderDate)
    ORDER BY DATE(orderDate)
  `;
  const [rows] = await pool.query(sql, [startDate, endDate]);
  const revenueByDate = rows.map(row => ({ date: row.date, revenue: row.revenue }));

  return revenueByDate;
};

const getSalesTrend = async (startDate, endDate) => {
  const sql = `
    SELECT DATE(orderDate) as date, SUM(totalPrice) as totalSales
    FROM orders
    WHERE orderDate >= ? AND orderDate <= ?
    GROUP BY DATE(orderDate)
    ORDER BY DATE(orderDate)
  `;
  const [rows] = await pool.query(sql, [startDate, endDate]);
  const salesTrend = rows.map(row => ({ date: row.date, totalSales: row.totalSales }));
  return salesTrend;
};

const getOrdersByPeriod = async (startDate, endDate) => {
  const sql = `
    SELECT DATE(orderDate) as date, COUNT(*) as orders
    FROM orders
    WHERE orderDate >= ? AND orderDate <= ?
    GROUP BY DATE(orderDate)
    ORDER BY DATE(orderDate)
  `;
  const [rows] = await pool.query(sql, [startDate, endDate]);
  const ordersByDate = rows.map(row => ({ date: row.date, orders: row.orders }));
  return ordersByDate;
};

const getBestSellingProducts = async () => {
    const sql = `
        SELECT p.id, p.name, SUM(oi.quantity) as totalQuantitySold
        FROM products p
        JOIN order_items oi ON p.id = oi.productId
        GROUP BY p.id
        ORDER BY totalQuantitySold DESC
        LIMIT 10;
    `;
    const [rows] = await pool.query(sql);
    return rows;
};

const getBestCategory = async () => {
  const sql = `
      SELECT c.id, c.name, SUM(oi.quantity) as totalQuantitySold
      FROM categories c
      JOIN products p ON c.id = p.categoryId
      JOIN order_items oi ON p.id = oi.productId
      GROUP BY c.id
      ORDER BY totalQuantitySold DESC
      LIMIT 1
  `;
  const [rows] = await pool.query(sql);
  return rows.length > 0 ? rows[0] : null;
};

const getNewVsReturningCustomers = async () => {
  const sql = `SELECT (
    SELECT COUNT(DISTINCT userId)
    FROM orders
    WHERE YEAR(orderDate) = YEAR(CURDATE()) AND userId IN (SELECT userId FROM orders GROUP BY userId HAVING MIN(orderDate) BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND CURDATE())
    ) AS newCustomersCount,
    (SELECT COUNT(DISTINCT userId) FROM orders WHERE userId IN (SELECT userId FROM orders GROUP BY userId HAVING COUNT(*) > 1)) AS returningCustomersCount`;
  const [rows] = await pool.query(sql);
  return rows[0];

};
const getMostCommonCustomerServiceIssues = async () => {
  const sql = ` SELECT COUNT(*) as mostCommonIssue FROM orders WHERE paymentStatus != 'paid' `;
  const [rows] = await pool.query(sql);
    
  return rows[0];
};
const getAbandonedCartRate = async () => {
  const sql = ` SELECT ( SELECT COUNT(DISTINCT userId) FROM order_items WHERE userId NOT IN (SELECT userId FROM orders) ) AS abandonedCarts, ( SELECT COUNT(DISTINCT userId) FROM order_items ) AS totalCarts, ( SELECT ( abandonedCarts / totalCarts ) * 100 FROM ( SELECT ( SELECT COUNT(DISTINCT userId) FROM order_items WHERE userId NOT IN (SELECT userId FROM orders) ) AS abandonedCarts, ( SELECT COUNT(DISTINCT userId) FROM order_items ) AS totalCarts ) AS subquery ) AS abandonedCartRate `;
    const [rows] = await pool.query(sql);
    
    return {
      abandonedCartRate: rows[0].abandonedCartRate,
    };
  };



const getProfitMarginPerProduct = async () => {
  const sql = ` SELECT p.id AS productId, p.name AS productName, SUM(oi.quantity * oi.price) AS totalRevenue, SUM(oi.quantity * p.costPrice) AS totalCost, ( SUM(oi.quantity * oi.price) - SUM(oi.quantity * p.costPrice) ) / SUM(oi.quantity * oi.price) AS profitMargin FROM products p JOIN order_items oi ON p.id = oi.productId GROUP BY p.id ORDER BY profitMargin DESC `;
  const [rows] = await pool.query(sql);
    
  return rows.map(row => ({
      productId: row.productId,
      productName: row.productName,
      totalRevenue: row.totalRevenue,
      profitMargin: row.profitMargin,
  }));
};



const getCustomerChurnRate = async () => {
  const sql = ` SELECT ( SELECT COUNT(DISTINCT userId) FROM orders ) AS totalCustomers, ( SELECT COUNT(DISTINCT userId) FROM orders WHERE orderDate < DATE_SUB(CURDATE(), INTERVAL 3 MONTH) ) AS churnedCustomers, ( SELECT (churnedCustomers / totalCustomers) * 100 FROM ( SELECT COUNT(DISTINCT userId) AS totalCustomers, ( SELECT COUNT(DISTINCT userId) FROM orders WHERE orderDate < DATE_SUB(CURDATE(), INTERVAL 3 MONTH) ) AS churnedCustomers FROM orders ) AS subquery ) as churnRate`;
    const [rows] = await pool.query(sql);
    
    return {
      churnRate: rows[0].churnRate,
    };
  };

const getProductPopularityOverTime = async () => {
  const sql = ` SELECT p.id AS productId, p.name AS productName, YEAR(o.orderDate) AS year, MONTH(o.orderDate) AS month, SUM(oi.quantity) AS quantitySold FROM products p JOIN order_items oi ON p.id = oi.productId JOIN orders o ON oi.orderId = o.id GROUP BY p.id, YEAR(o.orderDate), MONTH(o.orderDate) ORDER BY p.id, YEAR(o.orderDate), MONTH(o.orderDate) `;
  const [rows] = await pool.query(sql);

  return rows.map(row => ({
    productId: row.productId,
    productName: row.productName,
    year: row.year,
    month: row.month,
    quantitySold: row.quantitySold
  }));
}

const getCustomerSegmentation = async () => {
  const sql = ` SELECT userId, username, CASE WHEN percentile <= 0.3 THEN 'low' WHEN percentile <= 0.8 THEN 'mid' ELSE 'high' END AS customerSegment FROM ( SELECT u.id AS userId, u.username AS username, ( ( SELECT COUNT(*) FROM ( SELECT u.id AS userId, SUM(o.totalPrice) as totalSpent FROM users u JOIN orders o ON u.id = o.userId GROUP BY u.id ) AS totalSpentTable WHERE totalSpent >= userTotalSpent.totalSpent ) / ( SELECT COUNT(*) FROM ( SELECT u.id AS userId, SUM(o.totalPrice) as totalSpent FROM users u JOIN orders o ON u.id = o.userId GROUP BY u.id ) AS totalSpentTable ) ) AS percentile FROM users u JOIN orders o ON u.id = o.userId GROUP BY u.id ) AS userTotalSpent ORDER BY customerSegment DESC `;
  const [rows] = await pool.query(sql);

  return rows.map(row => ({
    userId: row.userId,
    username: row.username,
    customerSegment: row.customerSegment
  }));
}

const getWebsiteAppPerformance = async () => {
  const sql = ` SELECT source, COUNT(*) AS userCount FROM users GROUP BY source `;
  const [rows] = await pool.query(sql);
  return rows.map(row => ({
    source: row.source,
    userCount: row.userCount
  }));
}

const getSalesBySource = async () => {
  const sql = ` SELECT u.source, SUM(o.totalPrice) AS totalRevenue FROM users u JOIN orders o ON u.id = o.userId GROUP BY u.source `;
  const [rows] = await pool.query(sql);
  return rows.map(row => ({
    source: row.source,
    totalRevenue: row.totalRevenue
    }));
};
const updateSellerNameInSellerStatistics = async () => {
    await connection.execute('UPDATE seller_statistics SET sellerName = (SELECT username FROM users WHERE id = sellerId) WHERE sellerId IS NOT NULL;');    
}







const getLeastSellingProducts = async () => {
    const sql = `
        SELECT p.id, p.name, SUM(oi.quantity) as totalQuantitySold
        FROM products p
        JOIN order_items oi ON p.id = oi.productId
        GROUP BY p.id
        ORDER BY totalQuantitySold ASC
        LIMIT 10
    `;
    return rows;
};

const getLoyalClients = async () => {
  const sql = `
    SELECT u.id, u.username, COUNT(o.id) as totalOrders
    FROM users u
    JOIN orders o ON u.id = o.userId
    GROUP BY u.id
    ORDER BY totalOrders DESC
    LIMIT 10
  `;
  const [rows] = await pool.query(sql);
  return rows;
};

const getLowStockAlerts = async () => {
    const sql = `
        SELECT id, name, stock
        FROM products
        WHERE stock < 5
        ORDER BY stock ASC
    `;
    const [rows] = await pool.query(sql);
    return rows;
};

const getRevenueBySeller = async () => {
    const sql = `
        SELECT u.id, u.username, SUM(oi.quantity * oi.price) AS totalRevenue
        FROM users u
        JOIN products p ON u.id = p.sellerId
        JOIN order_items oi ON p.id = oi.productId
        GROUP BY u.id
        ORDER BY totalRevenue DESC
        
    `;
    const [rows] = await pool.query(sql);
    return rows.map(row => ({
      sellerId: row.id,
      sellerName: row.username,
      revenue: row.totalRevenue
    }));
};

const getPartialOrUnpaidPayments = async () => {
  const sql = `
    SELECT * FROM orders WHERE paymentStatus != 'paid'
  `;
  const [rows] = await pool.query(sql);
  return rows.map(row => ({...row}));
}

const getPaymentDistribution = async () => {
  const sql = `
    SELECT 
      SUM(CASE WHEN paymentMethod = 'PayPal' THEN 1 ELSE 0 END) as paypalCount,
      SUM(CASE WHEN paymentMethod = 'Cash on delivery' THEN 1 ELSE 0 END) as cashOnDeliveryCount,
      COUNT(*) as totalOrders
    FROM orders
  `;
  const [rows] = await pool.query(sql);
  const { paypalCount, cashOnDeliveryCount, totalOrders } = rows[0];
  return {
    paypalPercentage: totalOrders > 0 ? (paypalCount / totalOrders) * 100 : 0,
    cashOnDeliveryPercentage: totalOrders > 0 ? (cashOnDeliveryCount / totalOrders) * 100 : 0,
    paypalCount: paypalCount,
    cashOnDeliveryCount: cashOnDeliveryCount
  };
}

const getAverageCart = async () => {
  const sql = `
    SELECT AVG(totalPrice) as averageCartValue FROM orders
  `;
  const [rows] = await pool.query(sql);
  
  return rows[0].averageCartValue;
};

const getActiveOrInactiveClients = async () => {
  const sql = `
    SELECT 
      SUM(CASE WHEN lastLogin >= DATE_SUB(NOW(), INTERVAL 3 MONTH) THEN 1 ELSE 0 END) as activeClients,
      SUM(CASE WHEN lastLogin < DATE_SUB(NOW(), INTERVAL 3 MONTH) THEN 1 ELSE 0 END) as inactiveClients,
      COUNT(*) as totalClients
    FROM users
  `;
  const [rows] = await pool.query(sql);
  const { activeClients, inactiveClients, totalClients } = rows[0];
  return {
    activePercentage: totalClients > 0 ? (activeClients / totalClients) * 100 : 0,
    inactivePercentage: totalClients > 0 ? (inactiveClients / totalClients) * 100 : 0,
    activeCount: activeClients,
    inactiveCount: inactiveClients
  };
};

const getClientLifetimeValue = async () => {
  const sql = `
    SELECT AVG(totalSpent) as clientLifetimeValue
    FROM (
      SELECT u.id, u.username, SUM(o.totalPrice) as totalSpent
      FROM users u
      JOIN orders o ON u.id = o.userId
      GROUP BY u.id
    ) as userTotalSpent
  `;
  const [rows] = await pool.query(sql);
  if (!rows || rows.length === 0 || rows[0].clientLifetimeValue === null) {
    return 0; // Return 0 or handle as appropriate when no data is available
  }
  return rows[0].clientLifetimeValue;
}

const getConversionRate = async () => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM orders) as totalOrders,
      (SELECT COUNT(*) FROM users) as totalUsers,
      (SELECT COUNT(*) FROM (SELECT DISTINCT userId FROM orders) as usersWhoOrdered) as usersWhoOrdered
  `;
  const [rows] = await pool.query(sql);
  const { totalOrders, totalUsers, usersWhoOrdered } = rows[0];
  
  return {
    conversionRate: totalUsers > 0 ? (usersWhoOrdered / totalUsers) * 100 : 0,
    totalOrders: totalOrders,
    totalUsers: totalUsers,
    usersWhoOrdered: usersWhoOrdered
  };
}
module.exports = {
  createStatistic,
  getStatistics,
  getStatisticById,
  updateStatistic,
    deleteStatistic,
    getTotalUsers,
    getTotalProducts,
    getTotalOrders,
    getSalesTrend,
    getRevenueByPeriod,
    getOrdersByPeriod,
    getBestSellingProducts,
    getLeastSellingProducts,
    getLoyalClients,
    getLowStockAlerts,
    getRevenueBySeller,
    getPartialOrUnpaidPayments,
    getPaymentDistribution
    ,getActiveOrInactiveClients,
    getAverageCart
    ,getClientLifetimeValue
    ,getConversionRate
    ,getBestCategory
    ,getNewVsReturningCustomers
    ,getCustomerChurnRate
    ,getProfitMarginPerProduct
    ,getAbandonedCartRate
    ,getMostCommonCustomerServiceIssues
    ,getProductPopularityOverTime
    ,getCustomerSegmentation
    ,getWebsiteAppPerformance
    ,getSalesBySource
};

const getAllSellerStatistics = async () => {
  try {
    const [rows] = await connection.execute('SELECT * FROM seller_statistics');
    return rows;
    await updateSellerNameInSellerStatistics();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateSellerStatistic = async (statisticName, updatedStatistic) => {
  try {
    const [result] = await connection.execute('UPDATE seller_statistics SET ? WHERE statisticName = ?', [updatedStatistic, statisticName]);
    if (result.affectedRows === 0) {
      return { error: 'Statistic not found' };
    }
    return { message: 'Statistic updated', result };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSellerStatisticByName = async (statisticName) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM seller_statistics WHERE statisticName = ?', [statisticName]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const getVisibleSellerStatisticsBySeller = async (sellerId) => {
    try {
        const [rows] = await connection.execute('SELECT ss.statisticName FROM seller_statistics ss JOIN users u on ss.sellerId = u.id WHERE ss.isVisible = true AND (ss.sellerId = ? OR ss.sellerId IS NULL)',[sellerId]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports = {
  createStatistic,
  getStatistics,
  getStatisticById,
  updateStatistic,
    deleteStatistic,
    getTotalUsers,
    getTotalProducts,
    getTotalOrders,
    getSalesTrend,
    getRevenueByPeriod,
    getOrdersByPeriod,
    getBestSellingProducts,
    getLeastSellingProducts,
    getLoyalClients,
    getLowStockAlerts,
    getRevenueBySeller,
    getPartialOrUnpaidPayments,
    getPaymentDistribution
    ,getActiveOrInactiveClients,
    getAverageCart
    ,getClientLifetimeValue
    ,getConversionRate
    ,getBestCategory
    ,getNewVsReturningCustomers
    ,getCustomerChurnRate
    ,getProfitMarginPerProduct
    ,getAbandonedCartRate
    ,getMostCommonCustomerServiceIssues
    ,getProductPopularityOverTime
    ,getCustomerSegmentation
    ,getWebsiteAppPerformance
    ,getSalesBySource
    ,getAllSellerStatistics
    ,updateSellerStatistic
    ,getSellerStatisticByName
    ,getVisibleSellerStatisticsBySeller
    ,updateSellerNameInSellerStatistics
};