const express = require('express');
const router = express.Router();
const { handleNewUser } = require('../controllers/registerController');
//const verifyIdToken = require('../middleware/verifyIdToken'); // Import the middleware

router.post('/', handleNewUser);

module.exports = router;