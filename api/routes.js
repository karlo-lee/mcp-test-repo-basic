// API routing configuration

const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

// Marker: 3575dbed0452477c8c7331f86110d3b2

// API base route
router.use('/users', usersRouter);

module.exports = router;
