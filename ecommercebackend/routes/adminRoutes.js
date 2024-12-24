const express = require('express');
const { loginAdmin, createAdmin } = require('../controllers/adminController');

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);

// Admin creation route
router.post('/create', createAdmin);

module.exports = router;
