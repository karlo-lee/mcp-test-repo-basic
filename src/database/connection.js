// e3e4843e9e004e568c62fa7569a35213
// Connection pooling logic
const { Pool } = require('pg');
const config = require('./config');
const pool = new Pool(config);
module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect()
};