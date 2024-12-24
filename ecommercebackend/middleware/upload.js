const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save uploaded images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the current timestamp and the original file name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Set upload limits (optional)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Only allow images with extensions .jpg, .jpeg, .png
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);  // Allow the file
    } else {
      return cb(new Error('Only images (jpeg, jpg, png) are allowed.'));
    }
  }
});

module.exports = upload;
