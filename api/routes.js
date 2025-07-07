// API routing configuration
// f2852a94f7fc4179878514edaf43f15e

const express = require('express');
const app = express();

const userRoutes = require('./users');

// Mount user routes
app.use('/api/users', userRoutes);

module.exports = app;