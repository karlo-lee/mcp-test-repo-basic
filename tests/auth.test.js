// Authentication system tests (#de601d187d6945aaabf169d298b07db7)

const { login } = require('../src/auth/login');

describe('Authentication System Tests', () => {
    
    test('should login with valid credentials', async () => {
        const result = await login('admin', 'admin123');
        
        expect(result.success).toBe(true);
        expect(result.user).toBeDefined();
        expect(result.token).toBeDefined();
        expect(result.user.username).toBe('admin');
    });
    
    test('should fail login with invalid credentials', async () => {
        const result = await login('admin', 'wrongpassword');
        
        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid credentials');
        expect(result.user).toBeUndefined();
    });
    
    test('should fail login with missing username', async () => {
        const result = await login('', 'admin123');
        
        expect(result.success).toBe(false);
        expect(result.message).toBe('Username and password are required');
    });
    
    test('should fail login with missing password', async () => {
        const result = await login('admin', '');
        
        expect(result.success).toBe(false);
        expect(result.message).toBe('Username and password are required');
    });
    
    test('should fail login with both credentials missing', async () => {
        const result = await login('', '');
        
        expect(result.success).toBe(false);
        expect(result.message).toBe('Username and password are required');
    });
    
    test('should return token for valid user', async () => {
        const result = await login('user', 'user123');
        
        expect(result.success).toBe(true);
        expect(result.token).toContain('token_');
        expect(result.token).toContain('2'); // user id
    });
});

// Test ID: #de601d187d6945aaabf169d298b07db7