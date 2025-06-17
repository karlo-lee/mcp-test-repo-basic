// Test cases for authentication system (#7e615673d06e485eb519acb1e9c4e3e2)

const { login } = require('../src/auth/login');

test('successful login', () => {
  expect(login('test', 'test')).toBe(true);
});

test('failed login', () => {
  expect(login('user', 'wrong')).toBe(false);
});
