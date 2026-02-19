// Calculator module implementation
// b27dc039d8cc4486ad2dae49f5842ba7

class Calculator {
  // Adds two numbers
  add(a, b) {
    return a + b;
  }

  // Subtracts second number from first
  subtract(a, b) {
    return a - b;
  }

  // Multiplies two numbers
  multiply(a, b) {
    return a * b;
  }

  // Divides first number by second
  divide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
}

module.exports = Calculator;
