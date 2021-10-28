const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

// Users routes
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer,auth.admin, userCtrl.updateUser);
router.delete('/:id', auth.admin, multer, userCtrl.deleteUser);

module.exports = router;
