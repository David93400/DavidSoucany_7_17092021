const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

// Login routers

router.post('/signup', authCtrl.signup);
router.get('/login', authCtrl.login);

module.exports = router;
