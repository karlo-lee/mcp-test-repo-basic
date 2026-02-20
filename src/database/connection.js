// Connection pooling logic for database
// 975e2a42091746f38e6cb3b0d18aa7ba

const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

module.exports = pool;