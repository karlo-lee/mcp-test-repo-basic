const userService = new UserService();

// Test user creation
try {
  const user1 = userService.createUser(1, 'Alice', 'alice@example.com');
  const user2 = userService.createUser(2, 'Bob', 'bob@example.com');
  
  // Test invalid user creation
  try {
    userService.createUser();
  } catch (error) {
    console.log('Expected error:', error.message);
  }

  // Test user retrieval
  const retrievedUser = userService.getUser(1);
  console.log('Retrieved User:', retrievedUser);

  // Test invalid user retrieval
  try {
    userService.getUser(3);
  } catch (error) {
    console.log('Expected error:', error.message);
  }

  // Test user update
  const updatedUser = userService.updateUser(1, { name: 'Alice Smith', email: 'alice.smith@example.com' });
  console.log('Updated User:', updatedUser);

  // Test invalid user update
  try {
    userService.updateUser(3, { name: 'Non-existent' });
  } catch (error) {
    console.log('Expected error:', error.message);
  }

  // Test user deletion
  const deleted = userService.deleteUser(2);
  console.log('User deleted:', deleted);

  // Test invalid user deletion
  try {
    userService.deleteUser(3);
  } catch (error) {
    console.log('Expected error:', error.message);
  }

  // User management system (#c1e726e1570a477c824a10392ec7dfa0)
} catch (error) {
  console.error('Test error:', error.message);
}
