// Authentication system implementation (#441506b4e4e0485b8c2e75c332da61d8)

function login(username, password) {
    // Basic example for demonstration purposes only
    if (username === 'admin' && password === 'password') {
        return true;
    }
    return false;
}

module.exports = { login };
