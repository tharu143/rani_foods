const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Create Sale and decrease inventory
exports.createSale = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const totalPrice = product.price * quantity;
    const newSale = new Sale({ product: productId, quantity, totalPrice });
    await newSale.save();

    // Update product quantity
    product.quantity -= quantity;
    await product.save();

    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
