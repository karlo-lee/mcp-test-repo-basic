const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'securepassword',
  database: process.env.DB_NAME || 'appdb',
};

// Connection configuration - fa53df9222084d71bbfaa3a43dc2f72c

module.exports = dbConfig;