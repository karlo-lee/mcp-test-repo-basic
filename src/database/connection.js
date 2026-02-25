// 38ef47ba3a59425180ece20dd1775da6
// Connection pooling implementation
const Pool = require('pg').Pool;
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000
});
module.exports = pool; activities