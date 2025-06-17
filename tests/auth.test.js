// Test cases for authentication system (#f0e8453720674689ab559fce20cfa6eb)

const { login } = require('../src/auth/login');

describe('Authentication System', () => {
  test('login succeeds with username and password', () => {
    expect(login('user', 'pass')).toBe(true);
  });

  test('login fails with missing credentials', () => {
    expect(login('', '')).toBe(false);
  });
});
