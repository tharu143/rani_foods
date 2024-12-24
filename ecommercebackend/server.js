const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Import routes
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const saleRoutes = require('./routes/saleRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB file limit

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
