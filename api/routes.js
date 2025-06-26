// API Routes Configuration
// 30ba2d3e3b814dcbb21f2bc973607bdd

const express = require('express');
const userHandlers = require('./users');

const router = express.Router();

// Middleware for JSON parsing
router.use(express.json());

// Middleware for request logging
router.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// API health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// User management routes
router.get('/users', userHandlers.getAllUsers);
router.get('/users/:id', userHandlers.getUserById);
router.post('/users', userHandlers.createUser);
router.put('/users/:id', userHandlers.updateUser);
router.delete('/users/:id', userHandlers.deleteUser);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

module.exports = router;