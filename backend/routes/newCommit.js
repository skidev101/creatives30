const express = require('express');
const router = express.Router();
const { handleCommit } = require('../controllers/commitController');

router.post('/', handleCommit);

module.exports = router