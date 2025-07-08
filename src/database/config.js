const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'secure_password',
  database: process.env.DB_NAME || 'app_db',
  // Connection pooling configuration
  pool: {
    max: 10, // Maximum number of connections in pool
    min: 0,  // Minimum number of connections in pool
    idleTimeoutMillis: 30000, // Connection idle timeout
    connectionTimeoutMillis: 2000 // Connection request timeout
  }
};

// Reference: 3d958529abf94efeb0790acca9b19dd4