const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleProjectSubmit } = require('../controllers/projectSubmitController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.array('files'), handleProjectSubmit);

module.exports = router