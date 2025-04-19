const express = require('express');
const router = express.Router();
const { getAllAdmins } = require('../../controllers/admin/getAllAdminsController');
//const verifyIdToken = require('../../middleware/verifyIdToken'); 
//const verifyAdmin = require('../../middleware/verifyAdmin'); 

router.get('/', getAllAdmins);

module.exports = router