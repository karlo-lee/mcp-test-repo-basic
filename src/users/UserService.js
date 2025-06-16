// User management system (#448b4e0106a5412e9811be868522482e)

const User = require('./User');

class UserService {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  // Create new user
  create(userData) {
    const user = new User(this.nextId++, userData.name, userData.email);
    this.users.set(user.id, user);
    return user;
  }

  // Read user by ID
  read(id) {
    return this.users.get(id) || null;
  }

  // Update user
  update(id, userData) {
    const user = this.users.get(id);
    if (!user) return null;
    user.update(userData);
    return user;
  }

  // Delete user
  delete(id) {
    return this.users.delete(id);
  }

  // List all users
  list() {
    return Array.from(this.users.values());
  }
}

module.exports = UserService;