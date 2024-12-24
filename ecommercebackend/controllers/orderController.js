const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { cartItems, totalPrice, paymentMethod, orderStatus } = req.body;

    // Create new order in the database
    const newOrder = new Order({
      cartItems,
      totalPrice,
      paymentMethod,
      orderStatus,
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with the created order
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// Get all orders (Admin functionality)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
};
