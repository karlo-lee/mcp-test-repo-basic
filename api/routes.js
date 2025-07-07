// API Routes Configuration
// Reference ID: 3878a75ea2084ca6ae841d4a4d87b316

const express = require('express');
const userRoutes = require('./users');

/**
 * Configure and setup all API routes
 * @param {Express} app - Express application instance
 */
function setupRoutes(app) {
  // Middleware for JSON parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // API base route with version
  const apiRouter = express.Router();
  
  // Health check endpoint
  apiRouter.get('/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });
  
  // User management routes
  apiRouter.use('/users', userRoutes);
  
  // Mount API routes
  app.use('/api/v1', apiRouter);
  
  // Root API endpoint
  app.get('/api', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to User Management API',
      version: '1.0.0',
      endpoints: {
        health: '/api/v1/health',
        users: {
          list: 'GET /api/v1/users',
          get: 'GET /api/v1/users/:id',
          create: 'POST /api/v1/users',
          update: 'PUT /api/v1/users/:id',
          delete: 'DELETE /api/v1/users/:id'
        }
      }
    });
  });
  
  // 404 handler for API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'API endpoint not found',
      path: req.originalUrl
    });
  });
  
  // Global error handler
  app.use((error, req, res, next) => {
    console.error('API Error:', error);
    
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  });
}

/**
 * Initialize API routes with Express app
 * @param {Express} app - Express application instance
 * @returns {Express} Configured Express app
 */
function initializeAPI(app) {
  if (!app) {
    throw new Error('Express app instance is required');
  }
  
  setupRoutes(app);
  
  console.log('API routes initialized successfully');
  console.log('Available endpoints:');
  console.log('  GET    /api');
  console.log('  GET    /api/v1/health');
  console.log('  GET    /api/v1/users');
  console.log('  GET    /api/v1/users/:id');
  console.log('  POST   /api/v1/users');
  console.log('  PUT    /api/v1/users/:id');
  console.log('  DELETE /api/v1/users/:id');
  
  return app;
}

module.exports = {
  setupRoutes,
  initializeAPI
};