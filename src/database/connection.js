// 21e50b44c5bc4e3296d6496f5aebac41
// Implement connection pooling logic here
const connectionPool = require('./config');

// Connection pooling code
function getConnection() {
  return connectionPool.getConnection();
}

module.exports = { getConnection };