// Routing configuration
// 526f116f0bd3401aa2c59761563d08eb
const express = require('express');
const userRoutes = require('./users');

const router = express.Router();

// Use user routes
router.use('/users', userRoutes);

module.exports = router;