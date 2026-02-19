/**
 * Database Configuration Module
 * Reference: d6a8f06ba17f4efabdc3699f3478586a
 * 
 * This module provides centralized database configuration management
 * including connection pool settings for optimal performance.
 */

const config = {
    database: {
        // Database connection settings
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        name: process.env.DB_NAME || 'myapp_db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        
        // SSL configuration
        ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: false
        } : false,
        
        // Connection pool configuration - d6a8f06ba17f4efabdc3699f3478586a
        pool: {
            // Maximum number of connections in the pool
            max: parseInt(process.env.DB_POOL_MAX) || 20,
            
            // Minimum number of connections to maintain
            min: parseInt(process.env.DB_POOL_MIN) || 2,
            
            // How long a client is allowed to remain idle before being closed (ms)
            idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
            
            // Maximum time to wait for a connection (ms)
            connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 2000,
            
            // Maximum time to wait to acquire a connection from the pool (ms)
            acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
            
            // How often to run the idle connection reaper (ms)
            reapIntervalMillis: parseInt(process.env.DB_REAP_INTERVAL) || 1000,
            
            // How long to wait before timing out when connecting a new client (ms)
            createTimeoutMillis: parseInt(process.env.DB_CREATE_TIMEOUT) || 8000,
            
            // If true, the pool will emit an error on behalf of any idle clients
            createRetryIntervalMillis: parseInt(process.env.DB_CREATE_RETRY_INTERVAL) || 200,
        },
        
        // Query timeout settings
        query: {
            // Default query timeout (ms)
            timeout: parseInt(process.env.DB_QUERY_TIMEOUT) || 5000,
        },
        
        // Migration settings
        migrations: {
            directory: process.env.DB_MIGRATIONS_DIR || './migrations',
            tableName: process.env.DB_MIGRATIONS_TABLE || 'knex_migrations',
        },
        
        // Logging configuration
        logging: {
            enabled: process.env.DB_LOGGING === 'true' || false,
            level: process.env.DB_LOG_LEVEL || 'info',
        }
    },
    
    // Application environment settings
    app: {
        environment: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT) || 3000,
        logLevel: process.env.LOG_LEVEL || 'info',
    },
    
    // Health check configuration
    healthCheck: {
        enabled: process.env.HEALTH_CHECK_ENABLED === 'true' || true,
        interval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 30000,
        timeout: parseInt(process.env.HEALTH_CHECK_TIMEOUT) || 5000,
    }
};

/**
 * Validate configuration settings
 * Ensures all required configuration values are present and valid
 */
function validateConfig() {
    const required = [
        'database.host',
        'database.port',
        'database.name',
        'database.user'
    ];
    
    const missing = [];
    
    required.forEach(path => {
        const value = getNestedValue(config, path);
        if (value === undefined || value === null || value === '') {
            missing.push(path);
        }
    });
    
    if (missing.length > 0) {
        throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }
    
    // Validate pool configuration
    if (config.database.pool.max < config.database.pool.min) {
        throw new Error('Database pool max connections must be greater than min connections');
    }
    
    if (config.database.pool.max <= 0) {
        throw new Error('Database pool max connections must be greater than 0');
    }
}

/**
 * Get nested configuration value by dot notation path
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

/**
 * Get environment-specific configuration
 */
function getEnvironmentConfig() {
    const env = config.app.environment;
    
    const envConfigs = {
        development: {
            database: {
                pool: {
                    max: 10,
                    min: 1,
                }
            }
        },
        test: {
            database: {
                name: process.env.DB_TEST_NAME || 'myapp_test_db',
                pool: {
                    max: 5,
                    min: 1,
                }
            }
        },
        production: {
            database: {
                pool: {
                    max: 50,
                    min: 5,
                }
            }
        }
    };
    
    return envConfigs[env] || {};
}

// Merge environment-specific configuration
const envConfig = getEnvironmentConfig();
const mergedConfig = {
    ...config,
    database: {
        ...config.database,
        ...envConfig.database,
        pool: {
            ...config.database.pool,
            ...envConfig.database?.pool
        }
    }
};

// Validate configuration on module load
try {
    validateConfig();
    console.log('Database configuration validated successfully');
} catch (error) {
    console.error('Configuration validation failed:', error.message);
    process.exit(1);
}

module.exports = mergedConfig;