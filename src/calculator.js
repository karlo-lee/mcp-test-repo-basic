// Calculator module
// Feature ID: c178daa4fbc547c38eb28773b5793b28

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
  if (b === 0) return NaN;
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide
};