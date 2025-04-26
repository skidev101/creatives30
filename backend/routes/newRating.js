const express = require('express');
const router = express.Router();
const { handleRating } = require('../controllers/ratingController');

router.post('/', handleRating);

module.exports = router