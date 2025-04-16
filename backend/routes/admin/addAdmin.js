const express = require('express');
const router = express.Router();
const { createNewAdmin } = require('../../controllers/admin/addAdminController');
//const verifyIdToken = require('../../middleware/verifyIdToken'); 
//const verifyAdmin = require('../../middleware/verifyAdmin'); 

router.post('/', createNewAdmin);

module.exports = router