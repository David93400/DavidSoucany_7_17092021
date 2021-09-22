const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')

// User routes

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser)
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, multer, userCtrl.deleteUser);



module.exports = router