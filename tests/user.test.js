// User management system (#448b4e0106a5412e9811be868522482e)

const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

describe('User Management System', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('User Class', () => {
    test('should create user with correct properties', () => {
      const user = new User(1, 'John Doe', 'john@example.com');
      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
    });

    test('should update user data', () => {
      const user = new User(1, 'John Doe', 'john@example.com');
      user.update({ name: 'Jane Doe' });
      expect(user.name).toBe('Jane Doe');
    });
  });

  describe('UserService', () => {
    test('should create new user', () => {
      const user = userService.create({ name: 'John Doe', email: 'john@example.com' });
      expect(user.name).toBe('John Doe');
      expect(user.id).toBe(1);
    });

    test('should read existing user', () => {
      const createdUser = userService.create({ name: 'John Doe', email: 'john@example.com' });
      const readUser = userService.read(createdUser.id);
      expect(readUser).toBe(createdUser);
    });

    test('should update user', () => {
      const user = userService.create({ name: 'John Doe', email: 'john@example.com' });
      const updatedUser = userService.update(user.id, { name: 'Jane Doe' });
      expect(updatedUser.name).toBe('Jane Doe');
    });

    test('should delete user', () => {
      const user = userService.create({ name: 'John Doe', email: 'john@example.com' });
      const deleted = userService.delete(user.id);
      expect(deleted).toBe(true);
      expect(userService.read(user.id)).toBe(null);
    });
  });
});