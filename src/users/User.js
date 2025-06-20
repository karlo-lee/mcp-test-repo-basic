// User management system (#fe6861aca68d4cafa46be5b0302c4bef)
class User {
  constructor(id, name, email) {
    // Input validation
    if (!id || typeof id !== 'number') {
      throw new Error('User ID must be a valid number');
    }
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('User name must be a non-empty string');
    }
    if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
      throw new Error('User email must be a valid email address');
    }

    this.id = id;
    this.name = name.trim();
    this.email = email.trim().toLowerCase();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Basic email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  updateName(name) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('User name must be a non-empty string');
    }
    this.name = name.trim();
    this.updatedAt = new Date();
  }

  updateEmail(email) {
    if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
      throw new Error('User email must be a valid email address');
    }
    this.email = email.trim().toLowerCase();
    this.updatedAt = new Date();
  }

  toJSON() {
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