const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

// Comments routes
router.get('/', commentCtrl.getAllComments);
router.get('/post/:id', commentCtrl.findAllComments);
router.post('/', commentCtrl.createComment);
router.put('/:id',auth.admin, commentCtrl.updateComment);
router.delete('/:id',auth.admin, commentCtrl.deleteComment);

module.exports = router;
