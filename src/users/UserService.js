// User management system (#fe6861aca68d4cafa46be5b0302c4bef)
const User = require('./User');

class UserService {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  // Create a new user
  createUser(name, email) {
    try {
      const id = this.nextId++;
      const user = new User(id, name, email);
      this.users.set(id, user);
      return user;
    } catch (error) {
      // Reset the ID counter if user creation fails
      this.nextId--;
      throw error;
    }
  }

  // Read user by ID
  getUserById(id) {
    if (!id || typeof id !== 'number') {
      return null;
    }
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
    
    try {
      if (updates.name) {
        user.updateName(updates.name);
      }
      if (updates.email) {
        user.updateEmail(updates.email);
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  deleteUser(id) {
    if (!id || typeof id !== 'number') {
      return false;
    }
    
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

  // Check if email already exists
  emailExists(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }
    const normalizedEmail = email.trim().toLowerCase();
    return Array.from(this.users.values()).some(user => user.email === normalizedEmail);
  }
}

module.exports = UserService;