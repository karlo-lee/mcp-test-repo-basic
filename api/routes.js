// API routing configuration
// Reference: 449ad5b33b0e4054bb789393407a6faa

const express = require('express');
const usersRouter = require('./users');

const router = express.Router();

// Mount user routes
router.use('/users', usersRouter);

module.exports = router;