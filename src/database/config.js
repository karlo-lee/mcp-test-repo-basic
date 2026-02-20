// Database configuration
// b5f423a3ca83420897655f9fa4e6d228

module.exports = {
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASS || 'password',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
};