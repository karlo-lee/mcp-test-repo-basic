// Connection pooling logic for database
// 90086927c7904d07b4105108e5bf1cfe

const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

module.exports = pool;