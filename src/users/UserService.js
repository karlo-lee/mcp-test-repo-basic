// User management system (#de1618ccf82c4206b32ad4aadd4df06e)

const User = require('./User');

class UserService {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  // Create a new user
  createUser(name, email) {
    const user = new User(this.nextId++, name, email);
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
  updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) return null;

    if (updates.name) user.updateName(updates.name);
    if (updates.email) user.updateEmail(updates.email);

    return user;
  }

  // Delete user
  deleteUser(id) {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.delete(id);
    return true;
  }

  // Search users by email
  findUserByEmail(email) {
    return this.getAllUsers().find(user => user.email === email) || null;
  }
}

module.exports = UserService;