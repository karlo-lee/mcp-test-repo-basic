const mysql = require('mysql2/promise');

const createPool = () => {
  return mysql.createPool({
    ...require('./config'), // Import config settings
    waitForConnections: true,
    queueLimit: 0, // Unlimited queue
    timeouts: 30000, // 30-second timeout
  });
};

c58ac05e943f43298d8eed84637c2525