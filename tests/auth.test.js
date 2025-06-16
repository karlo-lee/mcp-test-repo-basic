// Authentication system test cases (#159870d5df044606a0adde3bb2093c5a)

const { login } = require('../src/auth/login');

test('login should succeed with correct credentials', () => {
    expect(login('admin', 'password')).toBe(true);
});

test('login should fail with incorrect credentials', () => {
    expect(login('user', 'pass')).toBe(false);
});
