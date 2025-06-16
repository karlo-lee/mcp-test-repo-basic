// Authentication system tests (#20af19ff1d174e4191568652aa0cf75b)

const AuthenticationSystem = require('../src/auth/login');

describe('Authentication System Tests', () => {
  let authSystem;

  beforeEach(() => {
    authSystem = new AuthenticationSystem();
  });

  describe('User Registration', () => {
    test('should register a new user successfully', () => {
      const result = authSystem.register('testuser', 'password123');
      expect(result.success).toBe(true);
      expect(result.message).toBe('User registered successfully');
    });

    test('should throw error when registering duplicate user', () => {
      authSystem.register('testuser', 'password123');
      expect(() => {
        authSystem.register('testuser', 'password456');
      }).toThrow('User already exists');
    });
  });

  describe('User Login', () => {
    beforeEach(() => {
      authSystem.register('testuser', 'password123');
    });

    test('should login with correct credentials', () => {
      const result = authSystem.login('testuser', 'password123');
      expect(result.success).toBe(true);
      expect(result.sessionId).toBeDefined();
      expect(result.message).toBe('Login successful');
    });

    test('should throw error with incorrect password', () => {
      expect(() => {
        authSystem.login('testuser', 'wrongpassword');
      }).toThrow('Invalid credentials');
    });

    test('should throw error with non-existent user', () => {
      expect(() => {
        authSystem.login('nonexistent', 'password123');
      }).toThrow('Invalid credentials');
    });
  });

  describe('Session Management', () => {
    let sessionId;

    beforeEach(() => {
      authSystem.register('testuser', 'password123');
      const loginResult = authSystem.login('testuser', 'password123');
      sessionId = loginResult.sessionId;
    });

    test('should validate active session', () => {
      const isValid = authSystem.validateSession(sessionId);
      expect(isValid).toBe(true);
    });

    test('should logout successfully', () => {
      const result = authSystem.logout(sessionId);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Logout successful');
    });

    test('should invalidate session after logout', () => {
      authSystem.logout(sessionId);
      const isValid = authSystem.validateSession(sessionId);
      expect(isValid).toBe(false);
    });

    test('should handle invalid session logout', () => {
      const result = authSystem.logout('invalid-session-id');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid session');
    });
  });

  describe('Password Hashing', () => {
    test('should hash passwords consistently', () => {
      const hash1 = authSystem.hashPassword('password123');
      const hash2 = authSystem.hashPassword('password123');
      expect(hash1).toBe(hash2);
    });

    test('should produce different hashes for different passwords', () => {
      const hash1 = authSystem.hashPassword('password123');
      const hash2 = authSystem.hashPassword('password456');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('Session ID Generation', () => {
    test('should generate unique session IDs', () => {
      const id1 = authSystem.generateSessionId();
      const id2 = authSystem.generateSessionId();
      expect(id1).not.toBe(id2);
    });

    test('should generate session IDs of reasonable length', () => {
      const sessionId = authSystem.generateSessionId();
      expect(sessionId.length).toBeGreaterThan(10);
    });
  });
});
