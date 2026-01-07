// User Management API Endpoints
// Implementation identifier: 6140946a4add4593acbef1a3684acefb

const express = require('express');

// In-memory user storage for demonstration
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
];

let nextUserId = 3;

/**
 * Get all users
 * GET /api/users
 */
const getAllUsers = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: users,
            count: users.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
        });
    }
};

/**
 * Get user by ID
 * GET /api/users/:id
 */
const getUserById = (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving user',
            error: error.message
        });
    }
};

/**
 * Create new user
 * POST /api/users
 */
const createUser = (req, res) => {
    try {
        const { name, email, role = 'user' } = req.body;
        
        // Basic validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }
        
        // Check if email already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        
        const newUser = {
            id: nextUserId++,
            name,
            email,
            role
        };
        
        users.push(newUser);
        
        res.status(201).json({
            success: true,
            data: newUser,
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

/**
 * Update user by ID
 * PUT /api/users/:id
 */
const updateUser = (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        const { name, email, role } = req.body;
        
        // Update user properties
        if (name) users[userIndex].name = name;
        if (email) {
            // Check if new email already exists (excluding current user)
            const existingUser = users.find(u => u.email === email && u.id !== userId);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already in use by another user'
                });
            }
            users[userIndex].email = email;
        }
        if (role) users[userIndex].role = role;
        
        res.status(200).json({
            success: true,
            data: users[userIndex],
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

/**
 * Delete user by ID
 * DELETE /api/users/:id
 */
const deleteUser = (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        const deletedUser = users.splice(userIndex, 1)[0];
        
        res.status(200).json({
            success: true,
            data: deletedUser,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};