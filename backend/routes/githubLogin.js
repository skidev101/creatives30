const express = require('express');
const router = express.Router();
const { handleGithubLogin } = require('../controllers/githubLoginController');
//const verifyIdToken = require('../middleware/verifyIdToken'); 

router.post('/', handleGithubLogin);

module.exports = router