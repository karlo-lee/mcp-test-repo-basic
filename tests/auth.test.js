// Authentication system tests (#7c821b91dc2943d9b9fdf969fa264a84)
const { login } = require('../src/auth/login');

test('valid login returns true', () => {
  expect(login('user', 'pass')).toBe(true);
});

test('invalid login returns false', () => {
  expect(login('user', 'wrongpass')).toBe(false);
  expect(login('wronguser', 'pass')).toBe(false);
});
