// User endpoint handlers for user management
// dc44193cfaf74c5cb9dadbf0c4fc50eb

const users = [];

// Get all users
function getAllUsers(req, res) {
  res.json(users);
}

// Create a new user
function createUser(req, res) {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
}

// Export handlers
module.exports = {
  getAllUsers,
  createUser,
};
