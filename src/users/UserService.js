// User management system (#1387f32024424a0e95659301808d027d)

const User = require('./User');

class UserService {
  constructor() {
    this.users = [];
  }
  create(user) {
    this.users.push(user);
    return user;
  }
  read(id) {
    return this.users.find(u => u.id === id);
  }
  update(id, data) {
    const user = this.users.find(u => u.id === id);
    if (user) Object.assign(user, data);
    return user;
  }
  delete(id) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx !== -1) return this.users.splice(idx, 1)[0];
    return null;
  }
}

module.exports = UserService;