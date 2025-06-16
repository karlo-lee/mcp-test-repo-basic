// User management system (#de1618ccf82c4206b32ad4aadd4df06e)

const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

describe('User Management System', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('User', () => {
    test('should create user with correct properties', () => {
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
      
      setTimeout(() => {
        user.updateName('Jane Doe');
        expect(user.name).toBe('Jane Doe');
        expect(user.updatedAt).not.toEqual(originalUpdatedAt);
      }, 1);
    });
  });

  describe('UserService', () => {
    test('should create user successfully', () => {
      const user = userService.createUser('Alice', 'alice@example.com');
      expect(user.id).toBe(1);
      expect(user.name).toBe('Alice');
      expect(user.email).toBe('alice@example.com');
    });

    test('should read user by ID', () => {
      const createdUser = userService.createUser('Bob', 'bob@example.com');
      const foundUser = userService.getUserById(createdUser.id);
      expect(foundUser).toEqual(createdUser);
    });

    test('should return null for non-existent user', () => {
      const user = userService.getUserById(999);
      expect(user).toBeNull();
    });

    test('should get all users', () => {
      userService.createUser('User1', 'user1@example.com');
      userService.createUser('User2', 'user2@example.com');
      
      const allUsers = userService.getAllUsers();
      expect(allUsers).toHaveLength(2);
    });

    test('should update user successfully', () => {
      const user = userService.createUser('Charlie', 'charlie@example.com');
      const updatedUser = userService.updateUser(user.id, {
        name: 'Charles',
        email: 'charles@example.com'
      });
      
      expect(updatedUser.name).toBe('Charles');
      expect(updatedUser.email).toBe('charles@example.com');
    });

    test('should delete user successfully', () => {
      const user = userService.createUser('David', 'david@example.com');
      const deleted = userService.deleteUser(user.id);
      
      expect(deleted).toBe(true);
      expect(userService.getUserById(user.id)).toBeNull();
    });

    test('should find user by email', () => {
      const user = userService.createUser('Eve', 'eve@example.com');
      const foundUser = userService.findUserByEmail('eve@example.com');
      
      expect(foundUser).toEqual(user);
    });
  });
});