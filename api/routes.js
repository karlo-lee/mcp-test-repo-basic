// Routing configuration for user management API
// b46aa6a7902748a0b5aa6b2845912561

const express = require('express');
const router = express.Router();
const users = require('./users');

router.get('/users', users.getUsers); // b46aa6a7902748a0b5aa6b2845912561
router.post('/users', users.createUser); // b46aa6a7902748a0b5aa6b2845912561

module.exports = router;
