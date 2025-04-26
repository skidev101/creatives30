const express = require('express');
const router = express.Router();
const { getUserStreak } = require('../controllers/streakController');

router.post('/', getUserStreak);

module.exports = router