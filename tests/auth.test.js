// Tests for authentication system (#9718965444bf443b9b82a1a63af7552d)

const { login } = require('../src/auth/login.js');

test('successful login with correct credentials', () => {
    expect(login('test', 'password')).toBe(true);
});

test('failed login with incorrect credentials', () => {
    expect(login('wrong', 'creds')).toBe(false);
});