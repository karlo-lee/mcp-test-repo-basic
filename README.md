# User Management System (#fe6861aca68d4cafa46be5b0302c4bef)

A comprehensive user management system with CRUD operations, input validation, and comprehensive test coverage.

## Features

- **User Class**: Represents a user with ID, name, email, and timestamps
- **UserService Class**: Manages user operations with full CRUD functionality
- **Input Validation**: Comprehensive validation for all user inputs
- **Email Normalization**: Automatic email normalization to lowercase
- **Test Coverage**: Complete test suite covering all functionality

## Usage

```javascript
const User = require('./src/users/User');
const UserService = require('./src/users/UserService');

// Create a new user service
const userService = new UserService();

// Create users
const user1 = userService.createUser('John Doe', 'john@example.com');
const user2 = userService.createUser('Jane Smith', 'jane@example.com');

// Read users
const retrievedUser = userService.getUserById(user1.id);
const allUsers = userService.getAllUsers();

// Update user
userService.updateUser(user1.id, { name: 'John Smith' });

// Delete user
userService.deleteUser(user2.id);
```

## Validation Features

- **User ID**: Must be a valid number
- **Name**: Must be a non-empty string (whitespace trimmed)
- **Email**: Must be a valid email format (normalized to lowercase)
- **Error Handling**: Comprehensive error messages for validation failures

## Testing

Run the test suite:

```bash
npm test
```

Test ID: #fe6861aca68d4cafa46be5b0302c4bef