const express = require('express');
const router = express.Router();
const { getCommitHistory } = require('../controllers/commitController');

router.post('/', getCommitHistory);

module.exports = router