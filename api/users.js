// User endpoint handlers
// f2852a94f7fc4179878514edaf43f15e

const express = require('express');
const router = express.Router();

// Example user endpoints
router.get('/users', (req, res) => {
  res.send('List of users');
});

router.post('/users', (req, res) => {
  res.send('Create a new user');
});

module.exports = router;