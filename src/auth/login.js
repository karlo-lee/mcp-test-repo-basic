// Authentication system implementation (#9b88553c06f241ac937e6342adef49ca)

function login(username, password) {
  // Simple login simulation
  if(username && password) {
    return { success: true, message: 'Login successful.' };
  } else {
    return { success: false, message: 'Invalid credentials.' };
  }
}

module.exports = { login };  