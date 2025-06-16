// Authentication system implementation (#8de5eb8cbc774e0cb834fed229df9c7a)

class AuthSystem {
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
      userId: user.id,
      username: username,
      createdAt: new Date()
    });

    return {
      sessionId,
      user: {
        id: user.id,
        username: user.username
      }
    };
  }

  // Register new user
  register(username, password, email) {
    if (this.users.has(username)) {
      throw new Error('User already exists');
    }

    const user = {
      id: this.generateUserId(),
      username,
      password, // Note: In production, this should be hashed
      email,
      createdAt: new Date()
    };

    this.users.set(username, user);
    return { id: user.id, username: user.username };
  }

  // Logout function
  logout(sessionId) {
    return this.sessions.delete(sessionId);
  }

  // Validate session
  validateSession(sessionId) {
    return this.sessions.has(sessionId);
  }

  // Helper methods
  generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

module.exports = AuthSystem;
