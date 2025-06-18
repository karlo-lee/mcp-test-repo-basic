// User management system (#1387f32024424a0e95659301808d027d)

const User = require('./User');

class UserService {
  constructor() {
    this.users = [];
  }
  validateUser(user) {
    if (!user || typeof user.id !== 'number' || typeof user.name !== 'string' || typeof user.email !== 'string') {
      throw new Error('Invalid user data');
    }
  }
  create(user) {
    this.validateUser(user);
    this.users.push(user);
    return user;
  }
  read(id) {
    return this.users.find(u => u.id === id);
  }
  update(id, data) {
    const user = this.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, data);
      this.validateUser(user);
    }
    return user;
  }
  delete(id) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx !== -1) return this.users.splice(idx, 1)[0];
    return null;
  }
}

module.exports = UserService;