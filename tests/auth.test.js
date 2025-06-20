// Authentication system test cases (#9ed1580d940e41d78cb2bb691e74f8d8)

const AuthenticationSystem = require('../src/auth/login');

describe('Authentication System Tests', () => {
  let authSystem;

  beforeEach(() => {
    authSystem = new AuthenticationSystem();
    // Set up test user
    authSystem.register('testuser', 'password123', 'test@example.com');
  });

  describe('Login Function', () => {
    test('should login successfully with valid credentials', async () => {
      const result = await authSystem.login('testuser', 'password123');
      
      expect(result.success).toBe(true);
      expect(result.sessionId).toBeDefined();
      expect(result.user.username).toBe('testuser');
      expect(result.user.email).toBe('test@example.com');
    });

    test('should fail login with invalid username', async () => {
      const result = await authSystem.login('invaliduser', 'password123');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    test('should fail login with invalid password', async () => {
      const result = await authSystem.login('testuser', 'wrongpassword');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });

    test('should fail login with empty credentials', async () => {
      const result1 = await authSystem.login('', 'password123');
      const result2 = await authSystem.login('testuser', '');
      
      expect(result1.success).toBe(false);
      expect(result1.error).toBe('Username and password are required');
      expect(result2.success).toBe(false);
      expect(result2.error).toBe('Username and password are required');
    });
  });

  describe('User Registration', () => {
    test('should register new user successfully', () => {
      const result = authSystem.register('newuser', 'newpassword', 'new@example.com');
      
      expect(result.success).toBe(true);
      expect(result.userId).toBeDefined();
    });

    test('should fail to register duplicate user', () => {
      expect(() => {
        authSystem.register('testuser', 'password', 'duplicate@example.com');
      }).toThrow('User already exists');
    });
  });

  describe('Session Management', () => {
    test('should create and validate session', async () => {
      const loginResult = await authSystem.login('testuser', 'password123');
      const sessionId = loginResult.sessionId;
      
      const validation = authSystem.validateSession(sessionId);
      
      expect(validation.valid).toBe(true);
      expect(validation.session.username).toBe('testuser');
    });

    test('should invalidate non-existent session', () => {
      const validation = authSystem.validateSession('invalid-session-id');
      
      expect(validation.valid).toBe(false);
      expect(validation.error).toBe('Session not found');
    });

    test('should logout successfully', async () => {
      const loginResult = await authSystem.login('testuser', 'password123');
      const sessionId = loginResult.sessionId;
      
      const logoutResult = authSystem.logout(sessionId);
      
      expect(logoutResult.success).toBe(true);
      
      // Session should be invalid after logout
      const validation = authSystem.validateSession(sessionId);
      expect(validation.valid).toBe(false);
    });
  });

  describe('Session Expiration', () => {
    test('should handle expired sessions', async () => {
      const loginResult = await authSystem.login('testuser', 'password123');
      const sessionId = loginResult.sessionId;
      
      // Manually expire the session for testing
      const session = authSystem.sessions.get(sessionId);
      session.expiresAt = new Date(Date.now() - 1000); // 1 second ago
      
      const validation = authSystem.validateSession(sessionId);
      
      expect(validation.valid).toBe(false);
      expect(validation.error).toBe('Session expired');
    });
  });

  describe('Security Tests', () => {
    test('should generate unique session IDs', async () => {
      const result1 = await authSystem.login('testuser', 'password123');
      authSystem.logout(result1.sessionId);
      
      const result2 = await authSystem.login('testuser', 'password123');
      
      expect(result1.sessionId).not.toBe(result2.sessionId);
    });

    test('should not expose password in login response', async () => {
      const result = await authSystem.login('testuser', 'password123');
      
      expect(result.user.password).toBeUndefined();
    });
  });
});
