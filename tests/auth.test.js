const { login } = require('../src/auth/login');

// Authentication system tests (#89cab5831c4241d89fd3a819783ea3ae)
test('login succeeds with admin credentials', () => {
    expect(login('admin', 'password')).toBe(true);
});
test('login fails with incorrect credentials', () => {
    expect(login('user', 'wrongpass')).toBe(false);
});
