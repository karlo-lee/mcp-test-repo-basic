const { Pool } = require('pg');

// Create connection pool with optimized settings
const pool = new Pool({
  connectionConfiguration: process.env.DB_CONFIG || require('./config'),
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // Connection idle timeout
  connectionTimeoutMillis: 2000, // Connection request timeout
});

// Connection pool reference: 1cc41c5003a34064a7df1f1dda8fc2e7

module.exports = pool;

// Error handling for connection issues
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});