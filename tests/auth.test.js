// Authentication system test (#441506b4e4e0485b8c2e75c332da61d8)

const { login } = require('../src/auth/login');

test('login returns true with correct credentials', () => {
    expect(login('admin', 'password')).toBe(true);
});

test('login returns false with incorrect credentials', () => {
    expect(login('admin', 'not_right')).toBe(false);
    expect(login('user', 'password')).toBe(false);
});
