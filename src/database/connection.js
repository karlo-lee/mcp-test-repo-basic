const { Pool } = require('pg');

// Connection pool implementation reference: 2cac774e3c63422c9102a2d9e070b7b0

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000 // How long to wait for a connection
});

module.exports = { 
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  end: () => pool.end()
};