// API routing configuration

const express = require('express');
const app = express();

// c39bbf759bf6407db335fe7e5aba0dac

// Import routes
const usersRouter = require('./users');

// Register routes
app.use('/users', usersRouter);

module.exports = app;