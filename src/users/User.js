// User management system (#448b4e0106a5412e9811be868522482e)

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Update user information
  update(data) {
    if (data.name) this.name = data.name;
    if (data.email) this.email = data.email;
    this.updatedAt = new Date();
  }

  // Get user data as object
  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = User;