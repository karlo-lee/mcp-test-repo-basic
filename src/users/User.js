// User management system (#085023613af14b83b366ef330aa9443e)

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
        if (!this.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        return true;
    }

    // Convert user to JSON
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