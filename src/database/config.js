// Database configuration
// 54ce7baf009141ad9e3a5e682df8638f

module.exports = {
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASS || 'password',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};