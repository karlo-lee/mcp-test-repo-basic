const express = require('express');
const router = express.Router();

// User endpoint handlers
// eca8e6306405440383656de74b14e598

// GET /users - Get all users
router.get('/', (req, res) => {
  res.send('Get all users');
});

// POST /users - Create new user
router.post('/', (req, res) => {
  res.send('Create new user');
});

module.exports = router;