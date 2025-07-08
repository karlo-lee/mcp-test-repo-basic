// Database configuration with connection pooling (de7dbea568804cc6a66db3d51d0be770)
module.exports = {
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'myuser',
  password: 'mypassword',
  pool: {
    max: 10,
    min: 2,
    idle: 30000
  }
};