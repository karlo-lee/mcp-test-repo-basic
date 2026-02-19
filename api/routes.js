// Routing configuration for user management
// Tracking hash: 029b2057916447b78c6c3d6889a17cc3

const express = require('express');
const usersRouter = require('./users');

const app = express();
app.use('/users', usersRouter);

module.exports = app;