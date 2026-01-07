// Calculator module implementation
// Identifier: 2693fb9b7161479ba78e3c1e2c628e1b

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