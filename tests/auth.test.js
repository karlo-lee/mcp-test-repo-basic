// Test cases for authentication system (#529b3d5d1ac64275a369050c4f3bd648)

const AuthenticationSystem = require('../src/auth/login');

describe('Authentication System Tests', () => {
  let authSystem;

  beforeEach(() => {
    authSystem = new AuthenticationSystem();
    // Setup test user
    authSystem.register('testuser', 'password123', 'test@example.com');
  });

  describe('Login functionality', () => {
    test('should login with valid credentials', () => {
      const result = authSystem.login('testuser', 'password123');
      expect(result.success).toBe(true);
      expect(result.sessionId).toBeDefined();
      expect(result.user.username).toBe('testuser');
    });

    test('should fail login with invalid credentials', () => {
      expect(() => {
        authSystem.login('testuser', 'wrongpassword');
      }).toThrow('Invalid credentials');
    });

    test('should fail login with missing username', () => {
      expect(() => {
        authSystem.login('', 'password123');
      }).toThrow('Username and password are required');
    });

    test('should fail login with missing password', () => {
      expect(() => {
        authSystem.login('testuser', '');
      }).toThrow('Username and password are required');
    });
  });

  describe('Registration functionality', () => {
    test('should register new user successfully', () => {
      const result = authSystem.register('newuser', 'newpass', 'new@example.com');
      expect(result.success).toBe(true);
      expect(result.message).toBe('User registered successfully');
    });

    test('should fail to register duplicate user', () => {
      expect(() => {
        authSystem.register('testuser', 'password', 'duplicate@example.com');
      }).toThrow('User already exists');
    });
  });

  describe('Logout functionality', () => {
    test('should logout successfully with valid session', () => {
      const loginResult = authSystem.login('testuser', 'password123');
      const logoutResult = authSystem.logout(loginResult.sessionId);
      expect(logoutResult.success).toBe(true);
      expect(logoutResult.message).toBe('Logged out successfully');
    });

    test('should fail logout with invalid session', () => {
      const result = authSystem.logout('invalidsession');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Session not found');
    });
  });

  describe('Session management', () => {
    test('should generate unique session IDs', () => {
      const session1 = authSystem.generateSessionId();
      const session2 = authSystem.generateSessionId();
      expect(session1).not.toBe(session2);
    });
  });
});
