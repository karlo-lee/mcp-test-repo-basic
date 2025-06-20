// Authentication system implementation (#1e42f5d78082424799512c979bcb1552)

function login(username, password) {
    // TODO: Implement basic login logic
    return username === 'admin' && password === 'password';
}

module.exports = { login };
