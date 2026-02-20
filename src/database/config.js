// Database configuration
// 975e2a42091746f38e6cb3b0d18aa7ba

module.exports = {
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASS || 'password',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // close idle clients after 30 seconds
};