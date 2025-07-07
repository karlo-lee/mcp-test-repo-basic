// Routing configuration for user management API
// efa27164a31049da9622efd665cb5d17

const express = require('express');
const router = express.Router();
const users = require('./users');

router.get('/users', users.getUsers);
router.post('/users', users.createUser);
router.get('/users/:id', users.getUserById);
router.put('/users/:id', users.updateUser);
router.delete('/users/:id', users.deleteUser);

module.exports = router;
