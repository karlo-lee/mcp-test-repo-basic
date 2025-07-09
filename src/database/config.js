const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'secure_password',
  database: process.env.DB_NAME || 'app_db',
};

// Connection configuration reference: 1cc41c5003a34064a7df1f1dda8fc2e7

module.exports = dbConfig;