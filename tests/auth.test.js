// Authentication tests (#25d3e1b2f08a4c6786f7b2a0c6897193)

const { login } = require('../src/auth/login');

describe('Authentication System Tests', () => {
    
    test('should successfully login with valid credentials', async () => {
        const result = await login('admin', 'password123');
        
        expect(result.success).toBe(true);
        expect(result.token).toBeDefined();
        expect(result.user).toBeDefined();
        expect(result.user.username).toBe('admin');
    });
    
    test('should fail login with invalid credentials', async () => {
        await expect(login('admin', 'wrongpassword'))
            .rejects
            .toThrow('Authentication failed: Invalid credentials');
    });
    
    test('should fail login with missing username', async () => {
        await expect(login('', 'password123'))
            .rejects
            .toThrow('Username and password are required');
    });
    
    test('should fail login with missing password', async () => {
        await expect(login('admin', ''))
            .rejects
            .toThrow('Username and password are required');
    });
    
    test('should fail login with null credentials', async () => {
        await expect(login(null, null))
            .rejects
            .toThrow('Username and password are required');
    });
    
    test('should return user object with correct structure', async () => {
        const result = await login('admin', 'password123');
        
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('user');
        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('username');
    });
});