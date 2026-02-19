// API routing configuration

const express = require('express');
const userRoutes = require('./users');

// d050f61d7c764a6194a95e7a05984399

const router = express.Router();

// Mount user routes
router.use('/users', userRoutes);

module.exports = router;