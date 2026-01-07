/**
 * Database Configuration
 * Reference ID: fbb40c7005524b85bb512cbf41f0979f
 * 
 * This module contains database configuration settings optimized for
 * connection pooling to improve application performance.
 */

const config = {
    database: {
        // Database connection settings
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        name: process.env.DB_NAME || 'myapp',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        
        // SSL configuration
        ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: false
        } : false,
        
        // Connection pool configuration
        pool: {
            // Maximum number of connections in the pool
            max: parseInt(process.env.DB_POOL_MAX) || 20,
            
            // Minimum number of connections in the pool
            min: parseInt(process.env.DB_POOL_MIN) || 2,
            
            // Close connections after 30 seconds of inactivity
            idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
            
            // Return an error after 3 seconds if connection cannot be established
            connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 3000,
            
            // Return an error after 5 seconds if connection cannot be acquired from pool
            acquireTimeoutMillis: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 5000,
        },
        
        // Query timeout settings
        query: {
            // Query timeout in milliseconds
            timeout: parseInt(process.env.DB_QUERY_TIMEOUT) || 10000,
        },
        
        // Retry configuration
        retry: {
            // Number of retry attempts for failed connections
            attempts: parseInt(process.env.DB_RETRY_ATTEMPTS) || 3,
            
            // Delay between retry attempts in milliseconds
            delay: parseInt(process.env.DB_RETRY_DELAY) || 1000,
        }
    },
    
    // Application settings
    app: {
        // Environment
        environment: process.env.NODE_ENV || 'development',
        
        // Logging level
        logLevel: process.env.LOG_LEVEL || 'info',
        
        // Enable query logging in development
        enableQueryLogging: process.env.NODE_ENV === 'development',
    }
};

/**
 * Validate configuration settings
 */
function validateConfig() {
    const required = ['host', 'port', 'name', 'user'];
    const missing = required.filter(key => !config.database[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required database configuration: ${missing.join(', ')}`);
    }
    
    // Validate pool settings
    if (config.database.pool.min > config.database.pool.max) {
        throw new Error('Database pool min cannot be greater than max');
    }
    
    if (config.database.pool.max <= 0) {
        throw new Error('Database pool max must be greater than 0');
    }
    
    console.log('Database configuration validated successfully');
}

/**
 * Get configuration for specific environment
 */
function getConfig(environment = null) {
    const env = environment || config.app.environment;
    
    // Environment-specific overrides
    const envConfig = { ...config };
    
    switch (env) {
        case 'test':
            envConfig.database.name = process.env.TEST_DB_NAME || 'myapp_test';
            envConfig.database.pool.max = 5; // Smaller pool for tests
            break;
            
        case 'production':
            envConfig.database.pool.max = parseInt(process.env.DB_POOL_MAX) || 50;
            envConfig.app.enableQueryLogging = false;
            break;
            
        default:
            // Development settings are already set as defaults
            break;
    }
    
    return envConfig;
}

// Validate configuration on module load
validateConfig();

module.exports = getConfig();