const express = require('express');
const router = express.Router();
const { deleteUser } = require('../../controllers/admin/userDeleteController');

router.post('/', deleteUser);

module.exports = router
