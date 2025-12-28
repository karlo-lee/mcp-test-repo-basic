// Calculator module
// Feature ID: 3dfc5571f4e4454885b9b4ae6388432f

function Calculator() {
  this.result = 0;
  
  this.add = function(a, b) {
    return a + b;
  };
  
  this.subtract = function(a, b) {
    return a - b;
  };
  
  this.multiply = function(a, b) {
    return a * b;
  };
  
  this.divide = function(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  };
}

module.exports = Calculator;