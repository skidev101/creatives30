const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../controllers/admin/getAllUsersController');
//const verifyIdToken = require('../../middleware/verifyIdToken'); 
//const verifyAdmin = require('../../middleware/verifyAdmin'); 

router.get('/', getAllUsers);

module.exports = router