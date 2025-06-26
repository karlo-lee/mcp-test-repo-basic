// API routing configuration for user management endpoints
// Reference ID: afa3b3e0cc2842ceb7aa0aa8fd80c2c4

const express = require('express');
const userHandlers = require('./users');

const router = express.Router();

// Middleware for JSON parsing
router.use(express.json());

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// User management routes
// GET /api/users - Get all users
router.get('/users', userHandlers.getAllUsers);

// GET /api/users/:id - Get specific user by ID
router.get('/users/:id', userHandlers.getUserById);

// POST /api/users - Create new user
router.post('/users', userHandlers.createUser);

// PUT /api/users/:id - Update existing user
router.put('/users/:id', userHandlers.updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/users/:id', userHandlers.deleteUser);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl
  });
});

// Global error handler
router.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

module.exports = router;