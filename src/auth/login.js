// Authentication system implementation (#25d3e1b2f08a4c6786f7b2a0c6897193)

/**
 * Login function for user authentication
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<Object>} Authentication result
 */
async function login(username, password) {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    
    // Basic authentication logic
    try {
        const authResult = await authenticateUser(username, password);
        if (authResult.success) {
            return {
                success: true,
                token: authResult.token,
                user: authResult.user
            };
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

/**
 * Mock authentication function
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>}
 */
async function authenticateUser(username, password) {
    // Mock implementation
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: username === 'admin' && password === 'password123',
                token: 'mock-jwt-token',
                user: { id: 1, username: username }
            });
        }, 100);
    });
}

module.exports = { login };