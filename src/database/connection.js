// Connection pooling logic for database
// b5f423a3ca83420897655f9fa4e6d228

const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

module.exports = pool;