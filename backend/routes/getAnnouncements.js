const express = require('express');
const router = express.Router();
const { getAllAnnouncements } = require('../controllers/getAnnouncementsController.js');

router.get('/', getAllAnnouncements);

module.exports = router