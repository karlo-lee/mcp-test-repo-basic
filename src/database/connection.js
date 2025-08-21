// a7152789c1ff49bd80646a69a368c496
const { Pool } = require('pg');
const config = require('./config');

// Create a pool with configuration
const pool = new Pool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  max: 20, // maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};