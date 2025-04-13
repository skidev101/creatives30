const express = require('express');
const router = express.Router();
const { handleGoogleLogin } = require('../controllers/googleLoginController');

router.post('/', handleGoogleLogin);

module.exports = router