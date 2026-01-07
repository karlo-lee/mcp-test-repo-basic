// User endpoint handlers

const express = require('express');
const router = express.Router();

// c39bbf759bf6407db335fe7e5aba0dac

// GET /users - Get all users
router.get('/', (req, res) => {
  res.send('List of users');
});

// POST /users - Create a new user
router.post('/', (req, res) => {
  res.send('Create a new user');
});

module.exports = router;