// Authentication system implementation (#9ed1580d940e41d78cb2bb691e74f8d8)

class AuthenticationSystem {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  // Basic login function
  async login(username, password) {
    try {
      // Validate input
      if (!username || !password) {
        throw new Error('Username and password are required');
      }

      // Check if user exists
      const user = this.users.get(username);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify password (in real implementation, use proper hashing)
      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }

      // Create session
      const sessionId = this.generateSessionId();
      const session = {
        userId: user.id,
        username: username,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 3600000) // 1 hour
      };
      
      this.sessions.set(sessionId, session);
      
      return {
        success: true,
        sessionId: sessionId,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate session ID
  generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Register new user
  register(username, password, email) {
    if (this.users.has(username)) {
      throw new Error('User already exists');
    }

    const user = {
      id: Date.now(),
      username: username,
      password: password, // In real app, hash this
      email: email,
      createdAt: new Date()
    };

    this.users.set(username, user);
    return { success: true, userId: user.id };
  }

  // Logout function
  logout(sessionId) {
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
      return { success: true };
    }
    return { success: false, error: 'Session not found' };
  }

  // Validate session
  validateSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return { valid: false, error: 'Session not found' };
    }

    if (session.expiresAt < new Date()) {
      this.sessions.delete(sessionId);
      return { valid: false, error: 'Session expired' };
    }

    return { valid: true, session: session };
  }
}

module.exports = AuthenticationSystem;
