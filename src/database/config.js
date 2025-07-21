const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'appdb',
  connectionLimit: 10, // Increased connection pool size
  // Other configuration options
};
c58ac05e943f43298d8eed84637c2525