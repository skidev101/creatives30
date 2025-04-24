const express = require('express');
const router = express.Router();
const { enableUser } = require('../../controllers/admin/userAccountStatusController');

router.patch('/', enableUser);

module.exports = router