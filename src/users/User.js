// User management system (#9068592de87249c4a70c564c5702a8aa)

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  // Get user information
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }

  // Update user information
  updateInfo(name, email) {
    if (name) this.name = name;
    if (email) this.email = email;
  }

  // Validate user data
  isValid() {
    return this.name && this.email && this.email.includes('@');
  }
}

module.exports = User;