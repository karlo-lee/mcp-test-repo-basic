const { Pool } = require('pg');

// Initialize connection pool
const pool = new Pool({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // How long a connection can be idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection from pool
});

module.exports = pool;

// Commit reference: 8c1e3af625b84d4398acd5f3f15ac956