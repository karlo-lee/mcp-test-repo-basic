// API Routes Configuration
// Development tracking: 03a6ba878ecd4a7d916838678a300023

const express = require('express');
const router = express.Router();

// Import route handlers
const userRoutes = require('./users');

// Middleware for JSON parsing
router.use(express.json());

// Middleware for request logging
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// API health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API information endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User Management API',
    version: '1.0.0',
    endpoints: {
      users: {
        'GET /api/users': 'Get all users',
        'GET /api/users/:id': 'Get user by ID',
        'POST /api/users': 'Create new user',
        'PUT /api/users/:id': 'Update user',
        'DELETE /api/users/:id': 'Delete user'
      },
      system: {
        'GET /api/health': 'API health check',
        'GET /api/': 'API information'
      }
    }
  });
});

// Mount user routes
router.use('/users', userRoutes);

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
    message: 'API endpoint not found',
    path: req.originalUrl
  });
});

module.exports = router;
