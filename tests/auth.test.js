// Test cases for authentication system (#10508342b1cb4bc99246f55a093e027a)
const { login } = require('../src/auth/login');

test('login with correct credentials returns true', () => {
  expect(login('admin', 'admin')).toBe(true);
});

test('login with incorrect credentials returns false', () => {
  expect(login('user', 'pass')).toBe(false);
});
