const express = require('express');
const router = express.Router();
const { handleNewUser } = require('../controllers/registerController');
const verifyIdToken = require('../middleware/verifyIdToken'); // Import the middleware

// Added verifyIdToken before handleNewUser
router.post('/', verifyIdToken, handleNewUser);

module.exports = router;