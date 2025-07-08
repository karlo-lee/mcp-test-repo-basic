/**
 * Database Connection Pool Manager
 * Implementation reference: ba5e353b50a14652844329e96f5dc71e
 * 
 * This module provides efficient database connection pooling to resolve
 * performance issues caused by creating new connections for each operation.
 */

const { Pool } = require('pg');
const config = require('./config');
const EventEmitter = require('events');

class ConnectionPool extends EventEmitter {
  constructor(options = {}) {
    super();
    this.config = { ...config.database, ...options };
    this.pool = null;
    this.isInitialized = false;
    this.connectionCount = 0;
    this.activeConnections = 0;
    
    // Connection pool statistics
    this.stats = {
      totalConnections: 0,
      activeConnections: 0,
      idleConnections: 0,
      waitingClients: 0,
      errors: 0
    };
  }

  /**
   * Initialize the connection pool
   * Reference ID: ba5e353b50a14652844329e96f5dc71e
   */
  async initialize() {
    if (this.isInitialized) {
      return this.pool;
    }

    try {
      this.pool = new Pool({
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
        user: this.config.user,
        password: this.config.password,
        max: this.config.maxConnections,
        min: this.config.minConnections,
        idleTimeoutMillis: this.config.idleTimeout,
        connectionTimeoutMillis: this.config.connectionTimeout,
        acquireTimeoutMillis: this.config.acquireTimeout,
        ssl: this.config.ssl
      });

      // Set up event listeners for monitoring
      this.setupEventListeners();
      
      // Test the connection
      await this.testConnection();
      
      this.isInitialized = true;
      this.emit('initialized');
      
      console.log('Database connection pool initialized successfully');
      return this.pool;
    } catch (error) {
      this.stats.errors++;
      this.emit('error', error);
      throw new Error(`Failed to initialize connection pool: ${error.message}`);
    }
  }

  /**
   * Set up event listeners for connection pool monitoring
   */
  setupEventListeners() {
    this.pool.on('connect', (client) => {
      this.activeConnections++;
      this.stats.totalConnections++;
      this.emit('connect', client);
    });

    this.pool.on('acquire', (client) => {
      this.stats.activeConnections++;
      this.emit('acquire', client);
    });

    this.pool.on('release', (client) => {
      this.stats.activeConnections--;
      this.stats.idleConnections++;
      this.emit('release', client);
    });

    this.pool.on('remove', (client) => {
      this.activeConnections--;
      this.emit('remove', client);
    });

    this.pool.on('error', (error, client) => {
      this.stats.errors++;
      this.emit('error', error, client);
      console.error('Database pool error:', error);
    });
  }

  /**
   * Test database connection
   */
  async testConnection() {
    const client = await this.pool.connect();
    try {
      await client.query('SELECT NOW()');
      console.log('Database connection test successful');
    } finally {
      client.release();
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
  async query(text, params = []) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } catch (error) {
      this.stats.errors++;
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Execute a transaction using a pooled connection
   */
  async transaction(callback) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      this.stats.errors++;
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get connection pool statistics
   */
  getStats() {
    return {
      ...this.stats,
      totalCount: this.pool?.totalCount || 0,
      idleCount: this.pool?.idleCount || 0,
      waitingCount: this.pool?.waitingCount || 0
    };
  }

  /**
   * Health check for the connection pool
   */
  async healthCheck() {
    try {
      const start = Date.now();
      await this.query('SELECT 1');
      const responseTime = Date.now() - start;
      
      return {
        status: 'healthy',
        responseTime,
        stats: this.getStats()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        stats: this.getStats()
      };
    }
  }

  /**
   * Gracefully close the connection pool
   */
  async close() {
    if (this.pool) {
      await this.pool.end();
      this.isInitialized = false;
      this.emit('closed');
      console.log('Database connection pool closed');
    }
  }
}

// Create and export a singleton instance
const connectionPool = new ConnectionPool();

module.exports = {
  ConnectionPool,
  pool: connectionPool,
  query: (text, params) => connectionPool.query(text, params),
  transaction: (callback) => connectionPool.transaction(callback),
  getConnection: () => connectionPool.getConnection(),
  getStats: () => connectionPool.getStats(),
  healthCheck: () => connectionPool.healthCheck(),
  close: () => connectionPool.close()
};
