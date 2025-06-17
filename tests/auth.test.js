// Authentication tests (#af6836a485884fe9ae58ef87d80e5010)

const { login, validateCredentials, generateAuthToken } = require('../src/auth/login');

describe('Authentication System Tests', () => {
    
    describe('login function', () => {
        test('should successfully login with valid credentials', async () => {
            const result = await login('admin', 'password123');
            
            expect(result.success).toBe(true);
            expect(result.token).toBeDefined();
            expect(result.user.username).toBe('admin');
        });
        
        test('should throw error with invalid credentials', async () => {
            await expect(login('invalid', 'wrong'))
                .rejects
                .toThrow('Invalid credentials');
        });
        
        test('should throw error with missing username', async () => {
            await expect(login('', 'password123'))
                .rejects
                .toThrow('Username and password are required');
        });
        
        test('should throw error with missing password', async () => {
            await expect(login('admin', ''))
                .rejects
                .toThrow('Username and password are required');
        });
    });
    
    describe('validateCredentials function', () => {
        test('should return true for valid credentials', async () => {
            const result = await validateCredentials('admin', 'password123');
            expect(result).toBe(true);
        });
        
        test('should return false for invalid credentials', async () => {
            const result = await validateCredentials('user', 'wrongpass');
            expect(result).toBe(false);
        });
    });
    
    describe('generateAuthToken function', () => {
        test('should generate token with username', () => {
            const token = generateAuthToken('testuser');
            expect(token).toContain('token_testuser_');
        });
        
        test('should generate unique tokens', () => {
            const token1 = generateAuthToken('user1');
            const token2 = generateAuthToken('user1');
            expect(token1).not.toBe(token2);
        });
    });
});