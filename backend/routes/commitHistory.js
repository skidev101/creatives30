const express = require('express');
const router = express.Router();
const { getCommitHistory } = require('../controllers/commitController');

router.get('/', getCommitHistory);

module.exports = router