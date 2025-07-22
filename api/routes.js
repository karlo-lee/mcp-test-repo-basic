const express = require('express');
const usersRouter = require('./users');

// Routing configuration
// eca8e6306405440383656de74b14e598

const app = express();
app.use('/users', usersRouter);

module.exports = app;