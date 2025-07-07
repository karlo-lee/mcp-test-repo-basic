// Connection pooling logic for database
// 54ce7baf009141ad9e3a5e682df8638f

const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

module.exports = pool;