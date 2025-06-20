// User management system (#89ddfb8e856d4f059358fdb19fe47c6d)

class UserService {
  constructor() {
    this.users = [];
  }
  create(user) {
    this.users.push(user);
    return user;
  }
  get(userId) {
    return this.users.find(u => u.id === userId);
  }
  update(userId, details) {
    const user = this.get(userId);
    if(user) Object.assign(user, details);
    return user;
  }
  delete(userId) {
    const idx = this.users.findIndex(u => u.id === userId);
    if(idx > -1) return this.users.splice(idx, 1)[0];
    return null;
  }
}

module.exports = UserService;
