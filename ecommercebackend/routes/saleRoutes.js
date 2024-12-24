const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Create sale and update product inventory
router.post('/', saleController.createSale);

module.exports = router;
