// User management system (#89ddfb8e856d4f059358fdb19fe47c6d)

class UserService {
  constructor() {
    // Use a Map to allow for easy conversion to Set or other collection types later
    this.users = new Map();
  }
  create(user) {
    this.users.set(user.id, user);
    return user;
  }
  get(userId) {
    return this.users.get(userId);
  }
  update(userId, details) {
    const user = this.get(userId);
    if(user) Object.assign(user, details);
    return user;
  }
  delete(userId) {
    if(this.users.has(userId)) {
      const deleted = this.users.get(userId);
      this.users.delete(userId);
      return deleted;
    }
    return null;
  }
}

module.exports = UserService;
