const express = require('express');
const router = express.Router();


const commentCtrl = require ('../controllers/comment');

router.get('/', commentCtrl.getAllComments);
router.get('/post/:id', commentCtrl.findAllComments);
router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.updateComment);
router.delete('/:id', commentCtrl.deleteComment);


module.exports = router;