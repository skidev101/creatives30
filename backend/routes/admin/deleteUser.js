const express = require('express');
const router = express.Router();
const { deleteUser } = require('../../controllers/admin/userDeleteController');

router.delete('/', deleteUser);

module.exports = router