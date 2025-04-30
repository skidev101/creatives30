const express = require('express');
const router = express.Router();
const { forgotPassword } = require('../controllers/passwordResetController');

router.post('/', forgotPassword);

module.exports = router