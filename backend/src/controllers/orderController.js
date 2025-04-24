const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');

// Create order
const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const result = await orderModel.createOrder(order);
    res.status(201).json({ ...result, order });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: 'Order already exists' });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get order by Id
const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    let order = await orderModel.getOrderById(id);
    const customer = await userModel.getUserById(order.customerId);
    const products = await Promise.all(
      order.productIds.map(async (productId) => {
        const product = await productModel.getProductById(productId);
        return product.name;
      })
    );
    const quantities = order.quantities;
    order.customerName = customer.name;
    order.products = products;
    order.quantities = quantities;
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error when getting the order' });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = req.body;

    const result = await orderModel.updateOrder(id, order);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ ...result, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error when updating the order' });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderModel.deleteOrder(id);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted', ...result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error when deleting the order' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};