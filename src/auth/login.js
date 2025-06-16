// Authentication system implementation (#20af19ff1d174e4191568652aa0cf75b)

class AuthenticationSystem {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  // Register a new user
  register(username, password) {
    if (this.users.has(username)) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = this.hashPassword(password);
    this.users.set(username, {
      password: hashedPassword,
      createdAt: new Date(),
      isActive: true
    });
    
    return { success: true, message: 'User registered successfully' };
  }

  // User login functionality
  login(username, password) {
    const user = this.users.get(username);
    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new Error('Invalid credentials');
    }

    const sessionId = this.generateSessionId();
    this.sessions.set(sessionId, {
      username,
      loginTime: new Date(),
      isValid: true
    });

    return {
      success: true,
      sessionId,
      message: 'Login successful'
    };
  }

  // Logout functionality
  logout(sessionId) {
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
      return { success: true, message: 'Logout successful' };
    }
    return { success: false, message: 'Invalid session' };
  }

  // Validate session
  validateSession(sessionId) {
    const session = this.sessions.get(sessionId);
    return session && session.isValid;
  }

  // Simple password hashing (for demo purposes)
  hashPassword(password) {
    // In production, use bcrypt or similar
    return Buffer.from(password).toString('base64');
  }

  // Generate session ID
  generateSessionId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}

module.exports = AuthenticationSystem;
