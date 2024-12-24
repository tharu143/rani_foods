const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');  // Import the multer config
const productController = require('../controllers/productController');

// Routes for products
router.post('/', upload.single('image'), productController.createProduct);  // Create product
router.get('/', productController.getAllProducts);  // Get all products
router.get('/:id', productController.getProductById);  // Get a single product by ID
router.put('/:id', upload.single('image'), productController.updateProduct);  // Update product
router.delete('/:id', productController.deleteProduct);  // Delete product

module.exports = router;
