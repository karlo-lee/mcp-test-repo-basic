// Database configuration for connection pooling
// Reference: 3fe2693f84f1423099e7cddf399a49f8
module.exports = {
  host: 'localhost',
  user: 'dbuser',
  password: 'securepassword',
  database: 'mydb',
  pool: {
    min: 2,
    max: 10
  }
};