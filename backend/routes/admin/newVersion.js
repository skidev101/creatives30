const express = require('express');
const router = express.Router();
const { createNewVersion } = require('../../controllers/admin/versionController');
//const verifyIdToken = require('../../middleware/verifyIdToken'); 
//const verifyAdmin = require('../../middleware/verifyAdmin'); 

router.post('/', createNewVersion);

module.exports = router