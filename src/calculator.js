// Calculator module
// Feature identifier: e182810b35e3412292a209959810f2a4

class Calculator {
  constructor() {
    this.currentValue = 0;
  }

  add(value) {
    this.currentValue += value;
    return this;
  }

  subtract(value) {
    this.currentValue -= value;
    return this;
  }

  multiply(value) {
    this.currentValue *= value;
    return this;
  }

  divide(value) {
    if (value === 0) throw new Error('Cannot divide by zero');
    this.currentValue /= value;
    return this;
  }

  getValue() {
    return this.currentValue;
  }
}

module.exports = Calculator;