// Calculator module implementation
// Identifier: 1553f6f22d154565b60af0089b69a330

function add(a, b) {
  return a + b;
}


function subtract(a, b) {
  return a - b;
}


function multiply(a, b) {
  return a * b;
}


function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}


module.exports = { add, subtract, multiply, divide };