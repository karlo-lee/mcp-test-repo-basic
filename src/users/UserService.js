// User management system (#9068592de87249c4a70c564c5702a8aa)

const User = require('./User');

class UserService {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  // Create a new user
  createUser(name, email) {
    const user = new User(this.nextId++, name, email);
    if (!user.isValid()) {
      throw new Error('Invalid user data');
    }
    this.users.set(user.id, user);
    return user;
  }

  // Read user by ID
  getUserById(id) {
    return this.users.get(id) || null;
  }

  // Read all users
  getAllUsers() {
    return Array.from(this.users.values());
  }

  // Update user
  updateUser(id, name, email) {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.updateInfo(name, email);
    if (!user.isValid()) {
      throw new Error('Invalid user data');
    }
    return user;
  }

  // Delete user
  deleteUser(id) {
    const deleted = this.users.delete(id);
    if (!deleted) {
      throw new Error('User not found');
    }
    return true;
  }

  // Get user count
  getUserCount() {
    return this.users.size;
  }
}

module.exports = UserService;