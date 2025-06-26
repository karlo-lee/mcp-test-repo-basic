// e8c584a0e6d14cbaa1b8d2f193f7ee9f: Basic calculator module implementation

class Calculator {
    // Addition
    add(a, b) {
        return a + b;
    }
    // Subtraction
    subtract(a, b) {
        return a - b;
    }
    // Multiplication
    multiply(a, b) {
        return a * b;
    }
    // Division
    divide(a, b) {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
    }
}

module.exports = Calculator;
