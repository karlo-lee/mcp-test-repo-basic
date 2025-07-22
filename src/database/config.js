const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'appdb',
};

// Commit reference: 8c1e3af625b84d4398acd5f3f15ac956

module.exports = dbConfig;