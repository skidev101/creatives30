const express = require('express');
const router = express.Router();
const { createAnnouncement } = require('../../controllers/admin/newAnnouncementController.js');

router.post('/', createAnnouncement);

module.exports = router