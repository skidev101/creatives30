const express = require('express');
const router = express.Router();
const { createNewComment } = require('../controllers/commentController');
const { getProjectComments } = require('../controllers/commentController');

router.route('/:projectId')
	.get(getProjectComments)
	.post(createNewComment);

module.exports = router