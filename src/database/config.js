/**
 * Database Configuration
 * Configuration ID: 67613dd66da94512bbf1f7f32aed6112
 * 
 * This module contains database configuration settings for connection pooling
 * and other database-related parameters.
 */

const config = {
  database: {
    // Connection details
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'myapp',
    
    // Connection pool settings
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
    timeout: parseInt(process.env.DB_TIMEOUT) || 60000,
    
    // Connection pool behavior
    reconnect: true,
    multipleStatements: false,
    
    // Pool management
    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT) || 600000, // 10 minutes
    
    // SSL configuration (if needed)
    ssl: process.env.DB_SSL === 'true' ? {
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
    } : false,
    
    // Charset
    charset: process.env.DB_CHARSET || 'utf8mb4'
  },
  
  // Performance settings
  performance: {
    // Query timeout
    queryTimeout: parseInt(process.env.QUERY_TIMEOUT) || 30000,
    
    // Connection retry settings
    maxRetries: parseInt(process.env.DB_MAX_RETRIES) || 3,
    retryDelay: parseInt(process.env.DB_RETRY_DELAY) || 1000,
    
    // Monitoring
    enableQueryLogging: process.env.ENABLE_QUERY_LOGGING === 'true',
    slowQueryThreshold: parseInt(process.env.SLOW_QUERY_THRESHOLD) || 5000
  },
  
  // Environment-specific settings
  environment: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test'
  }
};

/**
 * Validate configuration
 */
function validateConfig() {
  const required = ['host', 'user', 'name'];
  const missing = required.filter(key => !config.database[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required database config: ${missing.join(', ')}`);
  }
  
  if (config.database.connectionLimit < 1) {
    throw new Error('Connection limit must be at least 1');
  }
  
  if (config.database.acquireTimeout < 1000) {
    console.warn('Acquire timeout is very low, consider increasing it');
  }
}

/**
 * Get environment-specific configuration
 */
function getEnvironmentConfig() {
  if (config.environment.isTest) {
    return {
      ...config,
      database: {
        ...config.database,
        name: config.database.name + '_test',
        connectionLimit: 5 // Lower limit for tests
      }
    };
  }
  
  if (config.environment.isDevelopment) {
    return {
      ...config,
      performance: {
        ...config.performance,
        enableQueryLogging: true
      }
    };
  }
  
  return config;
}

// Validate configuration on load
validateConfig();

// Export environment-specific configuration
module.exports = getEnvironmentConfig();

// Export validation function for testing
module.exports.validateConfig = validateConfig;