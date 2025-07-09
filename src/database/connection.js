/**
 * Database Connection Pool Implementation
 * Reference: d6a8f06ba17f4efabdc3699f3478586a
 * 
 * This module provides connection pooling functionality to improve
 * database performance by reusing connections and managing connection lifecycle.
 */

const { Pool } = require('pg'); // PostgreSQL connection pool
const config = require('./config');

class DatabaseConnectionPool {
    constructor() {
        this.pool = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the connection pool with configuration
     * Implementation reference: d6a8f06ba17f4efabdc3699f3478586a
     */
    async initialize() {
        if (this.isInitialized) {
            return this.pool;
        }

        try {
            this.pool = new Pool({
                host: config.database.host,
                port: config.database.port,
                database: config.database.name,
                user: config.database.user,
                password: config.database.password,
                max: config.database.pool.max, // Maximum number of connections
                min: config.database.pool.min, // Minimum number of connections
                idleTimeoutMillis: config.database.pool.idleTimeout,
                connectionTimeoutMillis: config.database.pool.connectionTimeout,
                acquireTimeoutMillis: config.database.pool.acquireTimeout,
            });

            // Handle pool events
            this.pool.on('connect', (client) => {
                console.log('New client connected to database pool');
            });

            this.pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err);
            });

            this.pool.on('remove', (client) => {
                console.log('Client removed from pool');
            });

            this.isInitialized = true;
            console.log('Database connection pool initialized successfully');
            return this.pool;
        } catch (error) {
            console.error('Failed to initialize database connection pool:', error);
            throw error;
        }
    }

    /**
     * Get a connection from the pool
     */
    async getConnection() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return this.pool.connect();
    }

    /**
     * Execute a query using a pooled connection
     */
    async query(text, params) {
        const client = await this.getConnection();
        try {
            const result = await client.query(text, params);
            return result;
        } finally {
            client.release(); // Return connection to pool
        }
    }

    /**
     * Execute a transaction using a pooled connection
     */
    async transaction(callback) {
        const client = await this.getConnection();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Get pool statistics
     */
    getPoolStats() {
        if (!this.pool) {
            return null;
        }
        return {
            totalCount: this.pool.totalCount,
            idleCount: this.pool.idleCount,
            waitingCount: this.pool.waitingCount,
        };
    }

    /**
     * Close all connections in the pool
     */
    async close() {
        if (this.pool) {
            await this.pool.end();
            this.isInitialized = false;
            console.log('Database connection pool closed');
        }
    }
}

// Export singleton instance
const connectionPool = new DatabaseConnectionPool();
module.exports = connectionPool;