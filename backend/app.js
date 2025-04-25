const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/revenue-by-category', statisticsController.getRevenueByCategory);
router.get('/top-selling-products', statisticsController.getTopSellingProducts);
router.get('/orders-by-status', statisticsController.getOrdersByStatus);
router.get('/new-users-per-month', statisticsController.getNewUsersPerMonth);

module.exports = router;