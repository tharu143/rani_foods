const mongoose = require('mongoose');

// Define Order schema
const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: {
    method: { type: String, required: true },
    upiNumber: { type: String }, // For UPI payments
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
