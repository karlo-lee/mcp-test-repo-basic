// User management system (#a4932195ad7d4a6f8c3896231da893ba)

class UserService {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  createUser(name, email) {
    const user = { id: this.nextId++, name, email };
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  listUsers() {
    return this.users;
  }

  updateUser(id, data) {
    const user = this.getUser(id);
    if (!user) return null;
    Object.assign(user, data);
    return user;
  }

  deleteUser(id) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }
}

module.exports = UserService;
