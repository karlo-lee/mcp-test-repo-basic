// API routing configuration
// Commit hash: f60553755b5a4a3dbbbc2a5b750209ac

const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

// Mount user routes
router.use('/users', usersRouter);

module.exports = router;