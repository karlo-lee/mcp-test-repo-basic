// Connection pooling logic for database
// Pool identifier: e9bdaa009bbc40e582cbe54c649dff94

const { Pool } = require('pg');
const config = require('./config');

// Create a pool instance with configuration
e9bdaa009bbc40e582cbe54c649dff94; // Tag for tracking
const pool = new Pool(config.db);

module.exports = pool;
