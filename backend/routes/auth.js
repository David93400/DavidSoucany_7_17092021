const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');

// Login routers

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', auth ,authCtrl.logout);

module.exports = router;
