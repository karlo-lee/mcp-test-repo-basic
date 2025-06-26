// User management API endpoint handlers
// 1d23af35f70b4b28a3abd3c0f17134d3

const users = [];

// Get all users
exports.getUsers = (req, res) => {
  res.json({ users });
};

// Create a new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const id = users.length + 1;
  const user = { id, name, email };
  users.push(user);
  res.status(201).json(user);
};

// Get a user by ID
exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Update a user by ID
exports.updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { name, email } = req.body;
  user.name = name !== undefined ? name : user.name;
  user.email = email !== undefined ? email : user.email;
  res.json(user);
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
};
