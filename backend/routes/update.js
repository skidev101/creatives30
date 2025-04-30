const express = require('express');
const router = express.Router();
const multer = require('multer');
const { updateProfile } = require('../controllers/profileUpdateController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/', upload.array('files'), updateProfile);

module.exports = router