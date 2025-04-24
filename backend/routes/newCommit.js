const express = require('express');
const router = express.Router();
const { handleCommit } = require('../controllers/commitController');

router.get('/', handleCommit);

module.exports = router