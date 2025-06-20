// User management system (#89ddfb8e856d4f059358fdb19fe47c6d)

const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

describe('UserService', () => {
  let service;
  beforeEach(() => {
    service = new UserService();
  });
  it('should create a user', () => {
    const user = new User(1, 'Alice', 'alice@example.com');
    expect(service.create(user)).toEqual(user);
    expect(service.get(1)).toEqual(user);
  });
  it('should update a user', () => {
    const user = new User(2, 'Bob', 'bob@example.com');
    service.create(user);
    service.update(2, { name: 'Robert' });
    expect(service.get(2).name).toBe('Robert');
  });
  it('should delete a user', () => {
    service.create(new User(3, 'Eve', 'eve@example.com'));
    expect(service.delete(3)).toMatchObject({ id: 3 });
    expect(service.get(3)).toBeUndefined();
  });
});
