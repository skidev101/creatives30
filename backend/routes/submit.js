const express = require('express');
const router = express.Router();
const { handleProjectSubmit } = require('../controllers/projectSubmitController');
const verifyIdToken = require('../middleware/verifyIdToken'); 

router.post('/', verifyIdToken, handleProjectSubmit);

module.exports = router