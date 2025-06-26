// Routing configuration for user API
// 1d23af35f70b4b28a3abd3c0f17134d3

const express = require('express');
const users = require('./users');
const router = express.Router();

router.get('/users', users.getUsers);
router.post('/users', users.createUser);
router.get('/users/:id', users.getUserById);
router.put('/users/:id', users.updateUser);
router.delete('/users/:id', users.deleteUser);

module.exports = router;
