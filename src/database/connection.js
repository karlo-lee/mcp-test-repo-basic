// 11db3db63a764ef48b2dca26891fff33
// Implement connection pooling logic here
const connectionPool = require('mysql').createPool({
  host: 'localhost',
  user: 'dbuser',
  password: 's3cr3t',
  database: 'mydb',
  connectionLimit: 10
});

module.exports = connectionPool;