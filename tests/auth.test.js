// Test cases for authentication system (#8de5eb8cbc774e0cb834fed229df9c7a)

const AuthSystem = require('../src/auth/login');

describe('AuthSystem', () => {
  let auth;

  beforeEach(() => {
    auth = new AuthSystem();
  });

  describe('Registration', () => {
    test('should register a new user successfully', () => {
      const result = auth.register('testuser', 'password123', 'test@example.com');
      expect(result).toHaveProperty('id');
      expect(result.username).toBe('testuser');
    });

    test('should throw error for duplicate username', () => {
      auth.register('testuser', 'password123', 'test@example.com');
      expect(() => {
        auth.register('testuser', 'different', 'other@example.com');
      }).toThrow('User already exists');
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      auth.register('testuser', 'password123', 'test@example.com');
    });

    test('should login with valid credentials', () => {
      const result = auth.login('testuser', 'password123');
      expect(result).toHaveProperty('sessionId');
      expect(result.user.username).toBe('testuser');
    });

    test('should throw error for invalid username', () => {
      expect(() => {
        auth.login('wronguser', 'password123');
      }).toThrow('Invalid credentials');
    });

    test('should throw error for invalid password', () => {
      expect(() => {
        auth.login('testuser', 'wrongpassword');
      }).toThrow('Invalid credentials');
    });

    test('should throw error for missing credentials', () => {
      expect(() => {
        auth.login('', 'password123');
      }).toThrow('Username and password are required');

      expect(() => {
        auth.login('testuser', '');
      }).toThrow('Username and password are required');
    });
  });

  describe('Session Management', () => {
    let sessionId;

    beforeEach(() => {
      auth.register('testuser', 'password123', 'test@example.com');
      const loginResult = auth.login('testuser', 'password123');
      sessionId = loginResult.sessionId;
    });

    test('should validate active session', () => {
      expect(auth.validateSession(sessionId)).toBe(true);
    });

    test('should invalidate session after logout', () => {
      auth.logout(sessionId);
      expect(auth.validateSession(sessionId)).toBe(false);
    });

    test('should return false for invalid session', () => {
      expect(auth.validateSession('invalid-session')).toBe(false);
    });
  });
});
