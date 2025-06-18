// Authentication system implementation (#cfe31a51b4724d40ac81a70b0f1f0227)

function login(username, password) {
  // Basic login logic
  if (username === 'admin' && password === 'password') {
    return 'Login successful';
  } else {
    return 'Invalid credentials';
  }
}

export { login };