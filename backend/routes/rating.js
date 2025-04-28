const express = require('express');
const router = express.Router();
const { handleRating, getAverageRating } = require('../controllers/ratingController');

router.route('/:projectId')
	.get(getAverageRating)
	.post(handleRating);

module.exports = router