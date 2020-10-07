const express = require('express');

const router = express.Router();

const { getUserProfile } = require('../controllers/users');

router.get('/me', getUserProfile);

module.exports = router;
