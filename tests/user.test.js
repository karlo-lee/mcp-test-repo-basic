// User management system (#9068592de87249c4a70c564c5702a8aa)

const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

// Test User class
describe('User', () => {
  test('should create user with valid data', () => {
    const user = new User(1, 'John Doe', 'john@example.com');
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.isValid()).toBe(true);
  });

  test('should validate user data', () => {
    const validUser = new User(1, 'John', 'john@example.com');
    const invalidUser = new User(2, 'Jane', 'invalid-email');
    
    expect(validUser.isValid()).toBe(true);
    expect(invalidUser.isValid()).toBe(false);
  });

  test('should update user info', () => {
    const user = new User(1, 'John', 'john@example.com');
    user.updateInfo('Johnny', 'johnny@example.com');
    
    expect(user.name).toBe('Johnny');
    expect(user.email).toBe('johnny@example.com');
  });
});

// Test UserService class
describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  test('should create user', () => {
    const user = userService.createUser('John Doe', 'john@example.com');
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(userService.getUserCount()).toBe(1);
  });

  test('should read user by id', () => {
    const created = userService.createUser('John', 'john@example.com');
    const found = userService.getUserById(created.id);
    
    expect(found).toBe(created);
    expect(found.name).toBe('John');
  });

  test('should update user', () => {
    const user = userService.createUser('John', 'john@example.com');
    const updated = userService.updateUser(user.id, 'Johnny', 'johnny@example.com');
    
    expect(updated.name).toBe('Johnny');
    expect(updated.email).toBe('johnny@example.com');
  });

  test('should delete user', () => {
    const user = userService.createUser('John', 'john@example.com');
    const deleted = userService.deleteUser(user.id);
    
    expect(deleted).toBe(true);
    expect(userService.getUserById(user.id)).toBe(null);
    expect(userService.getUserCount()).toBe(0);
  });

  test('should get all users', () => {
    userService.createUser('John', 'john@example.com');
    userService.createUser('Jane', 'jane@example.com');
    
    const allUsers = userService.getAllUsers();
    expect(allUsers.length).toBe(2);
  });

  test('should throw error for invalid user creation', () => {
    expect(() => {
      userService.createUser('John', 'invalid-email');
    }).toThrow('Invalid user data');
  });

  test('should throw error when updating non-existent user', () => {
    expect(() => {
      userService.updateUser(999, 'John', 'john@example.com');
    }).toThrow('User not found');
  });

  test('should throw error when deleting non-existent user', () => {
    expect(() => {
      userService.deleteUser(999);
    }).toThrow('User not found');
  });
});