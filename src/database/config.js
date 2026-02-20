// 21e50b44c5bc4e3296d6496f5aebac41
// Database configuration for connection pooling
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
  pool: {
    max: 10,
    min: 2,
    idle: 30000
  }
};