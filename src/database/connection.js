// Database Connection Pool Implementation
// Task ID: 79b2c43a07b144cca408a9521e848dc2

const mysql = require('mysql2/promise');
const config = require('./config');

class ConnectionPool {
  constructor() {
    this.pool = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the connection pool
   */
  async initialize() {
    if (this.isInitialized) {
      return this.pool;
    }

    try {
      this.pool = mysql.createPool({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
        port: config.database.port,
        connectionLimit: config.database.connectionLimit,
        queueLimit: config.database.queueLimit,
        acquireTimeout: config.database.acquireTimeout,
        timeout: config.database.timeout,
        reconnect: true,
        charset: 'utf8mb4'
      });

      // Test the connection
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();

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
    return this.pool.getConnection();
  }

  /**
   * Execute a query using the pool
   */
  async query(sql, params = []) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const [rows, fields] = await this.pool.execute(sql, params);
      return { rows, fields };
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  /**
   * Execute a transaction
   */
  async transaction(callback) {
    const connection = await this.getConnection();
    
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Get pool status
   */
  getStatus() {
    if (!this.pool) {
      return { initialized: false };
    }

    return {
      initialized: this.isInitialized,
      allConnections: this.pool.pool.allConnections.length,
      freeConnections: this.pool.pool.freeConnections.length,
      acquiringConnections: this.pool.pool.acquiringConnections.length,
      connectionLimit: this.pool.pool.config.connectionLimit
    };
  }

  /**
   * Close the connection pool
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
module.exports = new ConnectionPool();
