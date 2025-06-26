// Database Configuration Settings
// Task ID: 79b2c43a07b144cca408a9521e848dc2

const config = {
  database: {
    // Basic connection settings
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'myapp',

    // Connection pool settings
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,
    acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
    timeout: parseInt(process.env.DB_TIMEOUT) || 60000,

    // Retry and reconnection settings
    reconnect: true,
    maxRetries: parseInt(process.env.DB_MAX_RETRIES) || 3,
    retryDelay: parseInt(process.env.DB_RETRY_DELAY) || 2000,

    // SSL settings (if needed)
    ssl: process.env.DB_SSL === 'true' ? {
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
    } : false
  },

  // Application settings
  app: {
    port: parseInt(process.env.PORT) || 3000,
    env: process.env.NODE_ENV || 'development'
  },

  // Logging settings
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableSql: process.env.LOG_SQL === 'true'
  }
};

// Validation function
function validateConfig() {
  const required = ['DB_HOST', 'DB_USER', 'DB_NAME'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    console.warn('Using default values - ensure this is intended for your environment');
  }

  // Validate numeric values
  if (config.database.connectionLimit < 1) {
    throw new Error('DB_CONNECTION_LIMIT must be at least 1');
  }

  if (config.database.port < 1 || config.database.port > 65535) {
    throw new Error('DB_PORT must be between 1 and 65535');
  }
}

// Run validation
validateConfig();

module.exports = config;
