/**
 * Database Connection Pool Manager
 * Implementation ID: 67613dd66da94512bbf1f7f32aed6112
 * 
 * This module provides efficient database connection pooling to improve
 * application performance and resource management.
 */

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
      return;
    }

    try {
      this.pool = mysql.createPool({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
        connectionLimit: config.database.connectionLimit,
        acquireTimeout: config.database.acquireTimeout,
        timeout: config.database.timeout,
        reconnect: true,
        multipleStatements: false
      });

      this.isInitialized = true;
      console.log('Database connection pool initialized successfully');
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

    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.error('Failed to get connection from pool:', error);
      throw error;
    }
  }

  /**
   * Execute a query using the connection pool
   */
  async query(sql, params = []) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Database query failed:', error);
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
   * Get pool status information
   */
  getPoolStatus() {
    if (!this.pool) {
      return { status: 'not_initialized' };
    }

    return {
      status: 'active',
      totalConnections: this.pool._allConnections.length,
      freeConnections: this.pool._freeConnections.length,
      usedConnections: this.pool._allConnections.length - this.pool._freeConnections.length
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