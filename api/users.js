// User management endpoint handlers
// Tracking hash: 029b2057916447b78c6c3d6889a17cc3

const express = require('express');
const router = express.Router();

// GET /users - Get all users
router.get('/', (req, res) => {
  res.send('List of users');
});

// POST /users - Create a new user
router.post('/', (req, res) => {
  res.send('Create a new user');
});

// GET /users/:id - Get a single user
router.get('/:id', (req, res) => {
  res.send(`Get user with ID ${req.params.id}`);
});

// PUT /users/:id - Update a user
router.put('/:id', (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

// DELETE /users/:id - Delete a user
router.delete('/:id', (req, res) => {
  res.send(`Delete user with ID ${req.params.id}`);
});

module.exports = router;