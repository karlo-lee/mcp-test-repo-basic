// Database configuration
// 90086927c7904d07b4105108e5bf1cfe

module.exports = {
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASS || 'password',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};