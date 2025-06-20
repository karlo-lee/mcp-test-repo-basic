// User management system (#fe6861aca68d4cafa46be5b0302c4bef)
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateName(name) {
    this.name = name;
    this.updatedAt = new Date();
  }

  updateEmail(email) {
    this.email = email;
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