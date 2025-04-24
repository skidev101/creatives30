const express = require('express');
const router = express.Router();
const { disableUser } = require('../../controllers/admin/userAccountStatusController');

router.patch('/', disableUser);

module.exports = router