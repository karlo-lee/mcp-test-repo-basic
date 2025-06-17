// User management system (#085023613af14b83b366ef330aa9443e)

const User = require('./User');

/**
 * Service class for managing users with CRUD operations
 * @class UserService
 */
class UserService {
    /**
     * Create a UserService instance
     */
    constructor() {
        this.users = new Map();
        this.nextId = 1;
    }

    /**
     * Create a new user
     * @param {Object} userData - User data object
     * @param {string} userData.name - User's name
     * @param {string} userData.email - User's email
     * @returns {User} Created user instance
     * @throws {Error} If validation fails
     */
    create(userData) {
        const user = new User(this.nextId++, userData.name, userData.email);
        user.validate();
        this.users.set(user.id, user);
        return user;
    }

    /**
     * Read user by ID
     * @param {number} id - User ID
     * @returns {User|null} User instance or null if not found
     */
    getById(id) {
        return this.users.get(id) || null;
    }

    /**
     * Read all users
     * @returns {User[]} Array of all users
     */
    getAll() {
        return Array.from(this.users.values());
    }

    /**
     * Update user data
     * @param {number} id - User ID to update
     * @param {Object} userData - Updated user data
     * @param {string} [userData.name] - Updated name
     * @param {string} [userData.email] - Updated email
     * @returns {User} Updated user instance
     * @throws {Error} If user not found or validation fails
     */
    update(id, userData) {
        const user = this.users.get(id);
        if (!user) {
            throw new Error('User not found');
        }
        
        if (userData.name) user.name = userData.name;
        if (userData.email) user.email = userData.email;
        
        user.validate();
        return user;
    }

    /**
     * Delete user by ID
     * @param {number} id - User ID to delete
     * @returns {boolean} True if user was deleted, false if not found
     */
    delete(id) {
        return this.users.delete(id);
    }
}

module.exports = UserService;