class UserService {
  constructor() {
    this.users = [];
  }

  createUser(id, name, email) {
    const user = new User(id, name, email);
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  updateUser(id, updates) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  }

  deleteUser(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  // User management system (#c1e726e1570a477c824a10392ec7dfa0)
}
