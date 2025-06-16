// Authentication system tests (#812d5618624e4f32b7a7ed333183b77c)

const { login, logout } = require('../src/auth/login');

// Mock fetch for testing
global.fetch = jest.fn();

describe('Authentication System Tests', () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    
    describe('login function', () => {
        test('should successfully authenticate with valid credentials', async () => {
            const mockResponse = {
                ok: true,
                json: async () => ({
                    token: 'mock-jwt-token',
                    user: { id: 1, username: 'testuser' }
                })
            };
            
            fetch.mockResolvedValueOnce(mockResponse);
            
            const result = await login('testuser', 'password123');
            
            expect(result.success).toBe(true);
            expect(result.token).toBe('mock-jwt-token');
            expect(result.user.username).toBe('testuser');
        });
        
        test('should fail with invalid credentials', async () => {
            const mockResponse = {
                ok: false,
                status: 401
            };
            
            fetch.mockResolvedValueOnce(mockResponse);
            
            const result = await login('wronguser', 'wrongpass');
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Authentication failed');
        });
        
        test('should throw error for missing username', async () => {
            await expect(login('', 'password123')).rejects.toThrow('Username and password are required');
        });
        
        test('should throw error for missing password', async () => {
            await expect(login('testuser', '')).rejects.toThrow('Username and password are required');
        });
    });
    
    describe('logout function', () => {
        test('should successfully logout', async () => {
            const mockResponse = {
                ok: true
            };
            
            fetch.mockResolvedValueOnce(mockResponse);
            
            const result = await logout();
            
            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledWith('/api/auth/logout', {
                method: 'POST'
            });
        });
        
        test('should handle logout errors gracefully', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));
            
            const result = await logout();
            
            expect(result).toBe(false);
        });
    });
});