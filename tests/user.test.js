// User management system (#fe6861aca68d4cafa46be5b0302c4bef)
const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

describe('User Management System', () => {
  describe('User Class', () => {
    test('should create a user with correct properties', () => {
      const user = new User(1, 'John Doe', 'john@example.com');
      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    test('should normalize email to lowercase', () => {
      const user = new User(1, 'John Doe', 'JOHN@EXAMPLE.COM');
      expect(user.email).toBe('john@example.com');
    });

    test('should trim whitespace from name and email', () => {
      const user = new User(1, '  John Doe  ', '  john@example.com  ');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
    });

    test('should throw error for invalid ID', () => {
      expect(() => new User(null, 'John Doe', 'john@example.com')).toThrow('User ID must be a valid number');
      expect(() => new User('1', 'John Doe', 'john@example.com')).toThrow('User ID must be a valid number');
    });

    test('should throw error for invalid name', () => {
      expect(() => new User(1, '', 'john@example.com')).toThrow('User name must be a non-empty string');
      expect(() => new User(1, '   ', 'john@example.com')).toThrow('User name must be a non-empty string');
      expect(() => new User(1, null, 'john@example.com')).toThrow('User name must be a non-empty string');
    });

    test('should throw error for invalid email', () => {
      expect(() => new User(1, 'John Doe', 'invalid-email')).toThrow('User email must be a valid email address');
      expect(() => new User(1, 'John Doe', '')).toThrow('User email must be a valid email address');
      expect(() => new User(1, 'John Doe', null)).toThrow('User email must be a valid email address');
    });

    test('should update user name with validation', () => {
      const user = new User(1, 'John Doe', 'john@example.com');
      const originalUpdatedAt = user.updatedAt;
      
      setTimeout(() => {
        user.updateName('Jane Doe');
        expect(user.name).toBe('Jane Doe');
        expect(user.updatedAt).not.toBe(originalUpdatedAt);
      }, 10);

      expect(() => user.updateName('')).toThrow('User name must be a non-empty string');
    });

    test('should update user email with validation', () => {
      const user = new User(1, 'John Doe', 'john@example.com');
      user.updateEmail('jane@example.com');
      expect(user.email).toBe('jane@example.com');

      expect(() => user.updateEmail('invalid-email')).toThrow('User email must be a valid email address');
    });
  });

  describe('UserService Class', () => {
    let userService;

    beforeEach(() => {
      userService = new UserService();
    });

    test('should create a new user', () => {
      const user = userService.createUser('Alice Smith', 'alice@example.com');
      expect(user).toBeInstanceOf(User);
      expect(user.name).toBe('Alice Smith');
      expect(user.email).toBe('alice@example.com');
      expect(userService.getUserCount()).toBe(1);
    });

    test('should handle user creation validation errors', () => {
      expect(() => userService.createUser('', 'alice@example.com')).toThrow('User name must be a non-empty string');
      expect(() => userService.createUser('Alice', 'invalid-email')).toThrow('User email must be a valid email address');
      expect(userService.getUserCount()).toBe(0); // No users should be created
    });

    test('should read user by ID', () => {
      const createdUser = userService.createUser('Bob Johnson', 'bob@example.com');
      const retrievedUser = userService.getUserById(createdUser.id);
      expect(retrievedUser).toBe(createdUser);
    });

    test('should return null for invalid ID types', () => {
      expect(userService.getUserById('invalid')).toBeNull();
      expect(userService.getUserById(null)).toBeNull();
    });

    test('should return null for non-existent user', () => {
      const user = userService.getUserById(999);
      expect(user).toBeNull();
    });

    test('should update user with validation', () => {
      const user = userService.createUser('Charlie Brown', 'charlie@example.com');
      const updatedUser = userService.updateUser(user.id, { name: 'Charles Brown' });
      expect(updatedUser.name).toBe('Charles Brown');
      expect(updatedUser.email).toBe('charlie@example.com');

      expect(() => userService.updateUser(user.id, { name: '' })).toThrow('User name must be a non-empty string');
      expect(() => userService.updateUser(user.id, { email: 'invalid-email' })).toThrow('User email must be a valid email address');
    });

    test('should delete user with validation', () => {
      const user = userService.createUser('David Wilson', 'david@example.com');
      const deleted = userService.deleteUser(user.id);
      expect(deleted).toBe(true);
      expect(userService.getUserById(user.id)).toBeNull();
      expect(userService.getUserCount()).toBe(0);

      expect(userService.deleteUser('invalid')).toBe(false);
      expect(userService.deleteUser(null)).toBe(false);
    });

    test('should return false when deleting non-existent user', () => {
      const deleted = userService.deleteUser(999);
      expect(deleted).toBe(false);
    });

    test('should get all users', () => {
      userService.createUser('User 1', 'user1@example.com');
      userService.createUser('User 2', 'user2@example.com');
      const allUsers = userService.getAllUsers();
      expect(allUsers).toHaveLength(2);
    });

    test('should check if email exists', () => {
      userService.createUser('Test User', 'test@example.com');
      expect(userService.emailExists('test@example.com')).toBe(true);
      expect(userService.emailExists('TEST@EXAMPLE.COM')).toBe(true); // Case insensitive
      expect(userService.emailExists('nonexistent@example.com')).toBe(false);
      expect(userService.emailExists('')).toBe(false);
      expect(userService.emailExists(null)).toBe(false);
    });
  });
});