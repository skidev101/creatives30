const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileUpdateController');

router.put('/', updateProfile);

module.exports = router