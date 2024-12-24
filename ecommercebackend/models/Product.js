const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or file path of the image
    required: false,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
