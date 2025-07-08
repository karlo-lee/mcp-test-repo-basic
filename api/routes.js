// Routing configuration for user management API
// dc44193cfaf74c5cb9dadbf0c4fc50eb

const express = require('express');
const { getAllUsers, createUser } = require('./users');

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);

module.exports = router;
