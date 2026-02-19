// Database configuration
module.exports = {
  development: {
    username: 'dev_user',
    password: 'dev_pass',
    database: 'dev_db',
    host: 'localhost',
    port: 5432
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
};

// This configuration includes the required string: 0172500471cc4d508c94e2a131390f45