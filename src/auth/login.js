// Authentication system implementation (#529b3d5d1ac64275a369050c4f3bd648)

class AuthenticationSystem {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  // Basic login function
  login(username, password) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const user = this.users.get(username);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const sessionId = this.generateSessionId();
    this.sessions.set(sessionId, {
      username: username,
      loginTime: new Date(),
      isActive: true
    });

    return {
      success: true,
      sessionId: sessionId,
      user: { username: user.username, email: user.email }
    };
  }

  // Generate unique session ID
  generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Register new user
  register(username, password, email) {
    if (this.users.has(username)) {
      throw new Error('User already exists');
    }

    this.users.set(username, {
      username: username,
      password: password,
      email: email,
      createdAt: new Date()
    });

    return { success: true, message: 'User registered successfully' };
  }

  // Logout function
  logout(sessionId) {
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
      return { success: true, message: 'Logged out successfully' };
    }
    return { success: false, message: 'Session not found' };
  }
}

module.exports = AuthenticationSystem;
