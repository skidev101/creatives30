const express = require('express');
const router = express.Router();
const { handleGoogleLogin } = require('../controllers/googleLoginController');
//const verifyIdToken = require('../middleware/verifyIdToken'); 

router.post('/', handleGoogleLogin);

module.exports = router