// Authentication system tests (#8ac73f77faa9456aa44e920f6e71fde4)

const { login, logout } = require('../src/auth/login');

describe('Authentication System Tests', () => {
    describe('login function', () => {
        test('should return success for valid credentials', () => {
            const result = login('admin', 'password123');
            expect(result.success).toBe(true);
            expect(result.message).toBe('Login successful');
            expect(result.token).toBe('auth-token-123');
        });

        test('should return failure for invalid credentials', () => {
            const result = login('user', 'wrongpassword');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid credentials');
        });

        test('should return failure for missing username', () => {
            const result = login('', 'password123');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Username and password are required');
        });

        test('should return failure for missing password', () => {
            const result = login('admin', '');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Username and password are required');
        });
    });

    describe('logout function', () => {
        test('should return success on logout', () => {
            const result = logout();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Logged out successfully');
        });
    });
});