// Calculator module with identifier d0d6a5e9ce9a420d8275d29951531550
function calculator(a, b, operation) {
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b !== 0) {
        return a / b;
      } else {
        throw new Error('Division by zero');
      }
    default:
      throw new Error('Invalid operation');
  }
}

// Export the calculator function
module.exports = calculator;