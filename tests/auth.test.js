// Authentication system tests (#0cbfd1688d0f413ea80f5bc01ca5f8c7)

const { login, logout } = require('../src/auth/login');

describe('Authentication System', () => {
    test('should login with valid credentials', () => {
        const result = login('admin', 'password');
        expect(result.success).toBe(true);
        expect(result.token).toBeDefined();
        expect(result.user.username).toBe('admin');
    });
    
    test('should fail login with invalid credentials', () => {
        const result = login('admin', 'wrongpassword');
        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid credentials');
    });
    
    test('should throw error for missing username', () => {
        expect(() => login('', 'password')).toThrow('Username and password are required');
    });
    
    test('should throw error for missing password', () => {
        expect(() => login('admin', '')).toThrow('Username and password are required');
    });
    
    test('should logout successfully', () => {
        const result = logout();
        expect(result.success).toBe(true);
        expect(result.message).toBe('Logged out successfully');
    });
});
