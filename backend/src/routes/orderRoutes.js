const express = require('express');
const router = express.Router();
    
// Import controller
const orderController = require('../controllers/orderController');
    
// Routes
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
    
module.exports = router;