// User management system (#dae1a457f7ff43eabb6716ebfd16fa4c)

const User = require('./User');

class UserService {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  // Create a new user
  create(name, email) {
    const user = new User(this.nextId++, name, email);
    user.validate();
    this.users.set(user.id, user);
    return user;
  }

  // Read a user by ID
  read(id) {
    return this.users.get(id) || null;
  }

  // Update a user
  update(id, name, email) {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.validate();
    return user;
  }

  // Delete a user
  delete(id) {
    return this.users.delete(id);
  }

  // List all users
  list() {
    return Array.from(this.users.values());
  }
}

module.exports = UserService;