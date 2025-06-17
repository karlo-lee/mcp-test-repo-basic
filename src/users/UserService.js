class UserService {
  constructor() {
    this.users = [];
  }

  createUser(id, name, email) {
    if (!id || !name || !email) {
      throw new Error('All fields are required');
    }
    const user = new User(id, name, email);
    this.users.push(user);
    return user;
  }

  getUser(id) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  updateUser(id, updates) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    if (updates.name && updates.email) {
      user.name = updates.name;
      user.email = updates.email;
    } else {
      throw new Error('Invalid update parameters');
    }
    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
    return true;
  }

  // User management system (#c1e726e1570a477c824a10392ec7dfa0)
}
