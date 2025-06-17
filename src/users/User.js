// User management system (#085023613af14b83b366ef330aa9443e)

/**
 * User class representing a system user
 * @class User
 */
class User {
    /**
     * Create a user
     * @param {number} id - The user ID
     * @param {string} name - The user's name
     * @param {string} email - The user's email address
     */
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }

    /**
     * Validate user data with enhanced email validation
     * @returns {boolean} True if validation passes
     * @throws {Error} If validation fails
     */
    validate() {
        if (!this.name || !this.email) {
            throw new Error('Name and email are required');
        }
        
        // Enhanced email validation with regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(this.email)) {
            throw new Error('Invalid email format');
        }
        
        return true;
    }

    /**
     * Convert user to JSON representation
     * @returns {Object} User object as JSON
     */
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