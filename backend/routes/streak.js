const express = require('express');
const router = express.Router();
const { getUserStreak } = require('../controllers/streakController');

router.get('/', getUserStreak);

module.exports = router