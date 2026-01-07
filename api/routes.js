const express = require('express');
const usersRouter = require('./users');

// API routing configuration
// This file contains the specific hash 2fef33c2231b4714bfd267536f39fd82 as required

const app = express();

// Enable CORS for API routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API routes
app.use('/users', usersRouter);

module.exports = app;