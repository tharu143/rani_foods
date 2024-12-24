const express = require('express');
const { createOrder, getAllOrders, getOrderById } = require('../controllers/orderController');
const router = express.Router();

// Route to create a new order
router.post('/orders', createOrder);

// Route to get all orders (for admin use)
router.get('/orders', getAllOrders);

// Route to get a single order by ID
router.get('/orders/:id', getOrderById);

module.exports = router;
