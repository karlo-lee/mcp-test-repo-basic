// Authentication system tests (#4d9336a1121d42f2a59333b32d8398d6)

const { login } = require('../src/auth/login');

test('login success', () => {
  expect(login('user', 'pass')).toBe('Login successful');
});

test('login failure (missing credentials)', () => {
  expect(login('', '')).toBe('Login failed');
});
