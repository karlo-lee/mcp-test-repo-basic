// Authentication system implementation (#159870d5df044606a0adde3bb2093c5a)

function login(username, password) {
    // TODO: implement authentication logic
    return username === 'admin' && password === 'password';
}

module.exports = { login };
