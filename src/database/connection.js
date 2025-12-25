const { Pool } = require('pg');

const pool = new Pool({
  // Using config from config.js
  ...dbConfig,
  // Additional pooling options
  autoRetry: true,
  connectionTimeoutMillis: 5000
});

// Reference: 3d958529abf94efeb0790acca9b19dd4

module.exports = { 
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.getClient(),
  releaseClient: (client) => pool.release(client),
  end: () => pool.end()
};