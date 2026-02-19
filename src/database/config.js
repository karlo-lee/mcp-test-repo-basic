// Database configuration
// Reference: 6294873eb0a6446bbfb0ecd13ff2d830

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myapp',
  connectionLimit: 10
};