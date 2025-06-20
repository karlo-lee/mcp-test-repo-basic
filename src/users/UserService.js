// User management system (#fe6861aca68d4cafa46be5b0302c4bef)
const User = require('./User');

class UserService {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  // Create a new user
  createUser(name, email) {
    const id = this.nextId++;
    const user = new User(id, name, email);
    this.users.set(id, user);
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
  updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) {
      return null;
    }
    
    if (updates.name) {
      user.updateName(updates.name);
    }
    if (updates.email) {
      user.updateEmail(updates.email);
    }
    
    return user;
  }

  // Delete user
  deleteUser(id) {
    const user = this.users.get(id);
    if (user) {
      this.users.delete(id);
      return true;
    }
    return false;
  }

  // Get user count
  getUserCount() {
    return this.users.size;
  }
}

module.exports = UserService;