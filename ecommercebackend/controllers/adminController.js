const Admin = require('../models/Admin'); // Adjust path if needed

// Admin login controller
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Plain-text password comparison
    if (admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Respond with success message
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Create Admin controller
const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newAdmin = new Admin({ username, email, password });
    await newAdmin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating admin', error: err.message });
  }
};

module.exports = { loginAdmin, createAdmin };
