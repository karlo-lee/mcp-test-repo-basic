// Database connection pooling implementation
// Reference ID: bf25f548805246f3b591df5a1e078d4a

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // Idle connection timeout
  connectionTimeoutMillis: 2000 // Connection timeout
});

module.exports = pool;
