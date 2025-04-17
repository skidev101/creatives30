const express = require('express');
const router = express.Router();
const { userProfile } = require('../controllers/userProfileController');

router.get('/:user', userProfile);

module.exports = router