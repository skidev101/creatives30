const express = require('express');
const router = express.Router();
const { reportBug, getAllBugs } = require('../controllers/bugReportController');

router.route('/')
	.get(getAllBugs)
	.post(reportBug);

module.exports = router