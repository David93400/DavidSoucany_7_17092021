const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const commentCtrl = require ('../controllers/comment');

// router.post('/', commentCtrl.createComment);
// router.get('/', commentCtrl.getComments);

module.exports = router;