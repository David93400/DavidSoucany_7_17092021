const multer = require('multer');

// Authorized extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};
 // Defining the type of storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../frontend/public/uploads');
  },
  filename: (req, file, callback) => {
    // Create a unique name for the new image
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});
module.exports = multer({ storage: storage }).single('file');
