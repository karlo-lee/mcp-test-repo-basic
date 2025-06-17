// User management system (#085023613af14b83b366ef330aa9443e)

const User = require('./User');

class UserService {
    constructor() {
        this.users = new Map();
        this.nextId = 1;
    }

    // Create a new user
    create(userData) {
        const user = new User(this.nextId++, userData.name, userData.email);
        user.validate();
        this.users.set(user.id, user);
        return user;
    }

    // Read user by ID
    getById(id) {
        return this.users.get(id) || null;
    }

    // Read all users
    getAll() {
        return Array.from(this.users.values());
    }

    // Update user
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

    // Delete user
    delete(id) {
        return this.users.delete(id);
    }
}

module.exports = UserService;