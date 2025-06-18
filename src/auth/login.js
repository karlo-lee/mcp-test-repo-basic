// Authentication system implementation (#0cbfd1688d0f413ea80f5bc01ca5f8c7)

function login(username, password) {
    // Basic login function implementation
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    
    // Mock authentication logic
    if (username === 'admin' && password === 'password') {
        return {
            success: true,
            token: 'mock-jwt-token',
            user: { id: 1, username: 'admin' }
        };
    }
    
    return {
        success: false,
        message: 'Invalid credentials'
    };
}

function logout() {
    // Clear authentication state
    return { success: true, message: 'Logged out successfully' };
}

module.exports = {
    login,
    logout
};
