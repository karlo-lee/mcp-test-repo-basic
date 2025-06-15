// Authentication test cases (#9b88553c06f241ac937e6342adef49ca)

const { login } = require('../src/auth/login');

test('login with valid credentials', () => {
  expect(login('user', 'pass')).toEqual({ success: true, message: 'Login successful.' });
});

test('login with missing credentials', () => {
  expect(login('', '')).toEqual({ success: false, message: 'Invalid credentials.' });
});
