// upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Set up storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
    allowed_formats: ['jpg', 'png', 'jpeg']
  },
});

const upload = multer({ storage });

module.exports = upload;
