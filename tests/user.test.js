// User management system (#085023613af14b83b366ef330aa9443e)

const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

describe('User Management Tests', () => {
    let userService;

    beforeEach(() => {
        userService = new UserService();
    });

    describe('User Class', () => {
        test('should create a user with valid data', () => {
            const user = new User(1, 'John Doe', 'john@example.com');
            expect(user.id).toBe(1);
            expect(user.name).toBe('John Doe');
            expect(user.email).toBe('john@example.com');
        });

        test('should validate user data', () => {
            const user = new User(1, 'John Doe', 'john@example.com');
            expect(() => user.validate()).not.toThrow();
        });

        test('should throw error for invalid email', () => {
            const user = new User(1, 'John Doe', 'invalid-email');
            expect(() => user.validate()).toThrow('Invalid email format');
        });
    });

    describe('UserService CRUD Operations', () => {
        test('should create a new user', () => {
            const userData = { name: 'Jane Doe', email: 'jane@example.com' };
            const user = userService.create(userData);
            
            expect(user.id).toBe(1);
            expect(user.name).toBe('Jane Doe');
            expect(user.email).toBe('jane@example.com');
        });

        test('should read user by ID', () => {
            const userData = { name: 'Bob Smith', email: 'bob@example.com' };
            const createdUser = userService.create(userData);
            const foundUser = userService.getById(createdUser.id);
            
            expect(foundUser).toEqual(createdUser);
        });

        test('should update user data', () => {
            const userData = { name: 'Alice Johnson', email: 'alice@example.com' };
            const user = userService.create(userData);
            
            const updatedUser = userService.update(user.id, { name: 'Alice Smith' });
            expect(updatedUser.name).toBe('Alice Smith');
            expect(updatedUser.email).toBe('alice@example.com');
        });

        test('should delete user', () => {
            const userData = { name: 'Charlie Brown', email: 'charlie@example.com' };
            const user = userService.create(userData);
            
            const deleted = userService.delete(user.id);
            expect(deleted).toBe(true);
            expect(userService.getById(user.id)).toBeNull();
        });
    });
});