const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'secure_password',
  database: process.env.DB_NAME || 'app_db',
  // Connection pool settings
  pool: {
    max: 10, // Maximum number of connections in pool
    min: 0, // Minimum number of connections in pool
    idleTimeoutMillis: 30000, // How long a connection can be idle before being closed
    connectionTimeoutMillis: 30000 // How long to wait for a connection from pool
  }
};

// bd28c526d39b42a6ab370a59f66b90ca - Database configuration with connection pooling

export default dbConfig;