// Test cases for authentication system (#cfe31a51b4724d40ac81a70b0f1f0227)

import { login } from '../src/auth/login';

describe('Authentication Tests', () => {
  test('Valid login', () => {
    expect(login('admin', 'password')).toBe('Login successful');
  });

  test('Invalid username', () => {
    expect(login('user', 'password')).toBe('Invalid credentials');
  });

  test('Invalid password', () => {
    expect(login('admin', 'wrong')).toBe('Invalid credentials');
  });
});