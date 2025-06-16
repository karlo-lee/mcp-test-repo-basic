// User management system (#dae1a457f7ff43eabb6716ebfd16fa4c)

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  // Validate user data
  validate() {
    if (!this.name || !this.email) {
      throw new Error('Name and email are required');
    }
    return true;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;