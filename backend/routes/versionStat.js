const express = require('express');
const router = express.Router();
const { getVersionStatistics } = require('../controllers/versionStatController');

router.get('/:ver', getVersionStatistics);

module.exports = router
