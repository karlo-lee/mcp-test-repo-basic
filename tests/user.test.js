// User management system (#dae1a457f7ff43eabb6716ebfd16fa4c)

const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

describe('User', () => {
  test('should create a user with valid data', () => {
    const user = new User(1, 'John Doe', 'john@example.com');
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });

  test('should validate user data', () => {
    const user = new User(1, '', 'john@example.com');
    expect(() => user.validate()).toThrow('Name and email are required');
  });
});

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  test('should create a new user', () => {
    const user = userService.create('Jane Doe', 'jane@example.com');
    expect(user.id).toBe(1);
    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane@example.com');
  });

  test('should read a user by ID', () => {
    const created = userService.create('Bob Smith', 'bob@example.com');
    const user = userService.read(created.id);
    expect(user).toEqual(created);
  });

  test('should update a user', () => {
    const created = userService.create('Alice Brown', 'alice@example.com');
    const updated = userService.update(created.id, 'Alice Johnson', null);
    expect(updated.name).toBe('Alice Johnson');
    expect(updated.email).toBe('alice@example.com');
  });

  test('should delete a user', () => {
    const created = userService.create('Charlie Wilson', 'charlie@example.com');
    const deleted = userService.delete(created.id);
    expect(deleted).toBe(true);
    expect(userService.read(created.id)).toBeNull();
  });

  test('should list all users', () => {
    userService.create('User 1', 'user1@example.com');
    userService.create('User 2', 'user2@example.com');
    const users = userService.list();
    expect(users.length).toBe(2);
  });
});