// Database connection pooling implementation
// Reference: 6294873eb0a6446bbfb0ecd13ff2d830

const pool = require('mysql2/promise').createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;