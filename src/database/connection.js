/* 99d523a83871493380a7540b81e2c3ad */
// Connection pooling implementation
const pool = require('./config');

module.exports = {
  connect: () => pool.connect()
};