const { Pool } = require('pg');
const dbConfig = require('./config');

// Create connection pool - fa53df9222084d71bbfaa3a43dc2f72c
const pool = new Pool({
  ...dbConfig,
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // How long a connection can be idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection from pool
});

// Test the connection
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Database connection established successfully');
  }
});

module.exports = pool;
