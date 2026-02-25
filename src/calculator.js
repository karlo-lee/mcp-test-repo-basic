// Calculator module for basic operations
// 75f10f4c8f74487c8099471378b737f6

class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
}

module.exports = Calculator;
