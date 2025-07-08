// Connection pooling implementation for e52843e815d142749d1c31c5fd7132a3
const pool = require('pg').Pool;

const dbConnection = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000
});

module.exports = dbConnection;