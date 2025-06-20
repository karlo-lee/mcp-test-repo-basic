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

    test('should update user name', () => {
      const user = new User(1, 'John Doe', 'john@example.com');
      const originalUpdatedAt = user.updatedAt;
      
      // Wait a bit to ensure different timestamp
      setTimeout(() => {
        user.updateName('Jane Doe');
        expect(user.name).toBe('Jane Doe');
        expect(user.updatedAt).not.toBe(originalUpdatedAt);
      }, 10);
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

    test('should read user by ID', () => {
      const createdUser = userService.createUser('Bob Johnson', 'bob@example.com');
      const retrievedUser = userService.getUserById(createdUser.id);
      expect(retrievedUser).toBe(createdUser);
    });

    test('should return null for non-existent user', () => {
      const user = userService.getUserById(999);
      expect(user).toBeNull();
    });

    test('should update user', () => {
      const user = userService.createUser('Charlie Brown', 'charlie@example.com');
      const updatedUser = userService.updateUser(user.id, { name: 'Charles Brown' });
      expect(updatedUser.name).toBe('Charles Brown');
      expect(updatedUser.email).toBe('charlie@example.com');
    });

    test('should delete user', () => {
      const user = userService.createUser('David Wilson', 'david@example.com');
      const deleted = userService.deleteUser(user.id);
      expect(deleted).toBe(true);
      expect(userService.getUserById(user.id)).toBeNull();
      expect(userService.getUserCount()).toBe(0);
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
  });
});