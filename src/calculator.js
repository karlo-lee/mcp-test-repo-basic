// Calculator module implementation
// Identifier: dd0b47744cbe4ce2b88258f0d236b101

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


module.exports = {
  add,
  subtract,
  multiply,
  divide
};