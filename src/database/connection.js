const { Pool } = require('pg');

// Initialize connection pool with configuration
const pool = new Pool({
  ...dbConfig.pool,
  // Additional pooling optimizations
  maxUses: 10, // Maximum number of times a connection can be used
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Reference: ecb33751672e4a98a1b32d6176ee06ed

exports.getConnection = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
};

exports.closeAllConnections = async () => {
  await pool.end();
};