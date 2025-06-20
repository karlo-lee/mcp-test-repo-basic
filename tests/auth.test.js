// Authentication system implementation (#1e42f5d78082424799512c979bcb1552)

const { login } = require('../src/auth/login');

describe('Login', () => {
    test('should login successfully with correct credentials', () => {
        expect(login('admin', 'password')).toBe(true);
    });
    test('should fail login with wrong credentials', () => {
        expect(login('admin', 'wrongpassword')).toBe(false);
        expect(login('user', 'password')).toBe(false);
    });
});
