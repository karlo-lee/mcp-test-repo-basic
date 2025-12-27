// Connection pooling implementation (f7e73a67dd1b4922a8625b5d322a4c42)
const pool = require('../config');

module.exports = {
  query: (text, params) => pool.query(text, params)
};