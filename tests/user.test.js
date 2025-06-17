const userService = new UserService();

// Test user creation
const user1 = userService.createUser(1, 'Alice', 'alice@example.com');
const user2 = userService.createUser(2, 'Bob', 'bob@example.com');

// Test user retrieval
const retrievedUser = userService.getUser(1);
console.log('Retrieved User:', retrievedUser);

// Test user update
const updatedUser = userService.updateUser(1, { name: 'Alice Smith' });
console.log('Updated User:', updatedUser);

// Test user deletion
const deleted = userService.deleteUser(2);
console.log('User deleted:', deleted);

// User management system (#c1e726e1570a477c824a10392ec7dfa0)
