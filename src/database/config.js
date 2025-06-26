// Database configuration for application
// Config identifier: e9bdaa009bbc40e582cbe54c649dff94

e9bdaa009bbc40e582cbe54c649dff94; // Tag for tracking
module.exports = {
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
    max: 10,            // Max connections in pool
    idleTimeoutMillis: 30000 // Idle timeout
  }
};
