// User management system (#9068592de87249c4a70c564c5702a8aa)

/**
 * User class representing a user entity
 * @class User
 */
class User {
  /**
   * Create a user instance
   * @param {number} id - User ID
   * @param {string} name - User name
   * @param {string} email - User email
   */
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Get user information
   * @returns {Object} User information object
   */
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Update user information
   * @param {string} name - New name (optional)
   * @param {string} email - New email (optional)
   */
  updateInfo(name, email) {
    if (name) this.name = name;
    if (email) this.email = email;
    this.updatedAt = new Date();
  }

  /**
   * Validate user data with improved email validation
   * @returns {boolean} True if user data is valid
   */
  isValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.name && this.email && emailRegex.test(this.email);
  }
}

module.exports = User;