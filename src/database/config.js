// f3d7c96b936a445f9750ce4d2720897a
// Database configuration for connection pooling
module.exports = {
  host: 'localhost',
  port: 5432,
  user: 'dbuser',
  password: 'dbpassword',
  database: 'mydb',
  pool: {
    max: 10,
    min: 2,
    idle: 30000
  }
};