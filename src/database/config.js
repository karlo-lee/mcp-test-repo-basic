/**
 * Database Configuration Module
 * Configuration reference: ba5e353b50a14652844329e96f5dc71e
 * 
 * This module provides centralized database configuration for connection pooling
 * and other database-related settings to optimize performance.
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Database connection configuration
 * Optimized for connection pooling - ba5e353b50a14652844329e96f5dc71e
 */
const database = {
  // Basic connection settings
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'myapp',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  
  // Connection pool settings
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS) || 20,
  minConnections: parseInt(process.env.DB_MIN_CONNECTIONS) || 2,
  
  // Timeout settings (in milliseconds)
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 30000,
  idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
  acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
  
  // SSL configuration
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
  } : false,
  
  // Query timeout
  queryTimeout: parseInt(process.env.DB_QUERY_TIMEOUT) || 30000,
  
  // Connection retry settings
  retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS) || 3,
  retryDelay: parseInt(process.env.DB_RETRY_DELAY) || 1000
};

/**
 * Environment-specific configurations
 */
const environments = {
  development: {
    ...database,
    maxConnections: 10,
    minConnections: 1,
    logging: true
  },
  
  test: {
    ...database,
    database: process.env.DB_TEST_NAME || 'myapp_test',
    maxConnections: 5,
    minConnections: 1,
    logging: false
  },
  
  production: {
    ...database,
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS) || 50,
    minConnections: parseInt(process.env.DB_MIN_CONNECTIONS) || 5,
    ssl: {
      rejectUnauthorized: false // Adjust based on your production SSL setup
    },
    logging: false
  }
};

/**
 * Get configuration for current environment
 */
function getConfig() {
  const env = process.env.NODE_ENV || 'development';
  return environments[env] || environments.development;
}

/**
 * Connection pool monitoring configuration
 */
const monitoring = {
  // Enable connection pool monitoring
  enabled: process.env.DB_MONITORING_ENABLED === 'true',
  
  // Monitoring interval in milliseconds
  interval: parseInt(process.env.DB_MONITORING_INTERVAL) || 60000,
  
  // Alert thresholds
  thresholds: {
    maxActiveConnections: parseInt(process.env.DB_ALERT_MAX_ACTIVE) || 15,
    maxWaitingClients: parseInt(process.env.DB_ALERT_MAX_WAITING) || 5,
    maxErrors: parseInt(process.env.DB_ALERT_MAX_ERRORS) || 10,
    responseTimeMs: parseInt(process.env.DB_ALERT_RESPONSE_TIME) || 5000
  }
};

/**
 * Database migration configuration
 */
const migrations = {
  directory: path.resolve(__dirname, '../migrations'),
  tableName: 'knex_migrations',
  extension: 'js'
};

/**
 * Database seeding configuration
 */
const seeds = {
  directory: path.resolve(__dirname, '../seeds')
};

/**
 * Validation function for database configuration
 */
function validateConfig(config) {
  const required = ['host', 'port', 'database', 'user'];
  const missing = required.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required database configuration: ${missing.join(', ')}`);
  }
  
  if (config.maxConnections <= config.minConnections) {
    throw new Error('maxConnections must be greater than minConnections');
  }
  
  if (config.connectionTimeout <= 0 || config.idleTimeout <= 0) {
    throw new Error('Timeout values must be positive numbers');
  }
}

/**
 * Export configuration object
 */
module.exports = {
  database: getConfig(),
  monitoring,
  migrations,
  seeds,
  environments,
  getConfig,
  validateConfig,
  
  // Utility functions
  isDevelopment: () => (process.env.NODE_ENV || 'development') === 'development',
  isProduction: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test'
};

// Validate configuration on module load
try {
  validateConfig(getConfig());
} catch (error) {
  console.error('Database configuration validation failed:', error.message);
  process.exit(1);
}
