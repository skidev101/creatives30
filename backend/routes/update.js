const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileUpdateController');
const verifyIdToken = require('../middleware/verifyIdToken'); 

router.put('/', verifyIdToken, updateProfile);

module.exports = router