const express = require('express');
const router = express.Router();
const { handleLogin } = require('../controllers/authController');
const verifyIdToken = require('../middleware/verifyIdToken'); 

router.post('/', verifyIdToken, handleLogin);

module.exports = router