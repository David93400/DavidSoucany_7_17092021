const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post'); 

router.post('/', multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts); 
router.get('/:id', postCtrl.getOnePost); 
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;
