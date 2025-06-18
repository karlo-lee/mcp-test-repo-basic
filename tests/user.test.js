// User management system (#1387f32024424a0e95659301808d027d)

const User = require('../src/users/User');
const UserService = require('../src/users/UserService');

test('CRUD operations', () => {
  const service = new UserService();
  // Create
  const user = new User(1, 'Alice', 'alice@example.com');
  expect(service.create(user)).toBe(user);
  // Read
  expect(service.read(1)).toEqual(user);
  // Update
  const updated = service.update(1, { name: 'Alicia' });
  expect(updated.name).toBe('Alicia');
  // Delete
  expect(service.delete(1)).toEqual(updated);
  expect(service.read(1)).toBeUndefined();
});