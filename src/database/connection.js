// Connection pooling logic for database
// eb77e9c277b3401784dea568de64545c

const { Pool } = require('pg');
const config = require('./config');

// Create a pool instance
const pool = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port,
  max: config.maxConnections || 10, // maximum number of clients in the pool
  idleTimeoutMillis: config.idleTimeoutMillis || 30000, // close idle clients after 30 seconds
});

module.exports = pool;