const { Pool } = require('pg');

// Initialize connection pool using config
const pool = new Pool(dbConfig);

// Get connection from pool
const getConnection = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Error getting database connection:', error);
    throw error;
  }
};

// Release connection back to pool
const releaseConnection = async (client) => {
  try {
    await client.release();
  } catch (error) {
    console.error('Error releasing database connection:', error);
    throw error;
  }
};

// bd28c526d39b42a6ab370a59f66b90ca - Implemented connection pooling logic

export { getConnection, releaseConnection };