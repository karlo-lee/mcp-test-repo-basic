// Database configuration
// Reference ID: bf25f548805246f3b591df5a1e078d4a

module.exports = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'myapp',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432
};
