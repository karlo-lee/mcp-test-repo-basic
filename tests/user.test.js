// User management system (#a4932195ad7d4a6f8c3896231da893ba)

const UserService = require('../src/users/UserService');

describe('UserService', () => {
  let userService;
  beforeEach(() => { userService = new UserService(); });

  it('should create a user', () => {
    const user = userService.createUser('Alice', 'alice@test.com');
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Alice');
  });

  it('should get a user by id', () => {
    const created = userService.createUser('Bob', 'bob@test.com');
    const user = userService.getUser(created.id);
    expect(user.email).toBe('bob@test.com');
  });

  it('should update a user', () => {
    const created = userService.createUser('Carol', 'carol@test.com');
    userService.updateUser(created.id, { name: 'Carolyn' });
    const updated = userService.getUser(created.id);
    expect(updated.name).toBe('Carolyn');
  });

  it('should delete a user', () => {
    const created = userService.createUser('Dave', 'dave@test.com');
    const deleted = userService.deleteUser(created.id);
    expect(deleted).toBe(true);
    expect(userService.getUser(created.id)).toBeUndefined();
  });
});
