/**
 * Calculator Module
 * Feature identifier: 26f9df103a2a448abc4ce583714c05d4
 * 
 * This module provides basic arithmetic operations for the application.
 * Developed as part of the code review workflow implementation.
 */

class Calculator {
    /**
     * Add two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Sum of a and b
     */
    add(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        return a + b;
    }

    /**
     * Subtract second number from first number
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Difference of a and b
     */
    subtract(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        return a - b;
    }

    /**
     * Multiply two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Product of a and b
     */
    multiply(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        return a * b;
    }

    /**
     * Divide first number by second number
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number} Quotient of a and b
     */
    divide(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    }

    /**
     * Calculate percentage
     * @param {number} value - The value
     * @param {number} percentage - The percentage
     * @returns {number} Percentage of the value
     */
    percentage(value, percentage) {
        if (typeof value !== 'number' || typeof percentage !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        return (value * percentage) / 100;
    }
}

// Export the Calculator class
module.exports = Calculator;

// Example usage:
// const calc = new Calculator();
// console.log(calc.add(5, 3)); // 8
// console.log(calc.subtract(10, 4)); // 6
// console.log(calc.multiply(3, 7)); // 21
// console.log(calc.divide(15, 3)); // 5
// console.log(calc.percentage(200, 15)); // 30