/**
 * Calculator Module
 * 
 * This module provides basic calculator functionality for the application.
 * Feature identifier: 45de926faad14d2fb2ebee0a2c79d402
 * 
 * @author Development Team
 * @version 1.0.0
 */

class Calculator {
    /**
     * Constructor for Calculator class
     */
    constructor() {
        this.result = 0;
        this.history = [];
    }

    /**
     * Add two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Sum of a and b
     */
    add(a, b) {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        this.result = result;
        return result;
    }

    /**
     * Subtract second number from first number
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Difference of a and b
     */
    subtract(a, b) {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        this.result = result;
        return result;
    }

    /**
     * Multiply two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Product of a and b
     */
    multiply(a, b) {
        const result = a * b;
        this.history.push(`${a} * ${b} = ${result}`);
        this.result = result;
        return result;
    }

    /**
     * Divide first number by second number
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number} Quotient of a and b
     * @throws {Error} When dividing by zero
     */
    divide(a, b) {
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        const result = a / b;
        this.history.push(`${a} / ${b} = ${result}`);
        this.result = result;
        return result;
    }

    /**
     * Get the last calculated result
     * @returns {number} Last result
     */
    getResult() {
        return this.result;
    }

    /**
     * Get calculation history
     * @returns {Array<string>} Array of calculation strings
     */
    getHistory() {
        return [...this.history];
    }

    /**
     * Clear the calculator state
     */
    clear() {
        this.result = 0;
        this.history = [];
    }

    /**
     * Calculate percentage
     * @param {number} value - The value
     * @param {number} percentage - The percentage
     * @returns {number} Percentage of the value
     */
    percentage(value, percentage) {
        const result = (value * percentage) / 100;
        this.history.push(`${percentage}% of ${value} = ${result}`);
        this.result = result;
        return result;
    }

    /**
     * Calculate power
     * @param {number} base - Base number
     * @param {number} exponent - Exponent
     * @returns {number} Result of base raised to exponent
     */
    power(base, exponent) {
        const result = Math.pow(base, exponent);
        this.history.push(`${base}^${exponent} = ${result}`);
        this.result = result;
        return result;
    }

    /**
     * Calculate square root
     * @param {number} value - The value
     * @returns {number} Square root of the value
     * @throws {Error} When value is negative
     */
    sqrt(value) {
        if (value < 0) {
            throw new Error('Cannot calculate square root of negative number');
        }
        const result = Math.sqrt(value);
        this.history.push(`√${value} = ${result}`);
        this.result = result;
        return result;
    }
}

// Export the Calculator class for use in other modules
module.exports = Calculator;

// Example usage (commented out for production)
/*
const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(calc.multiply(4, 2)); // 8
console.log(calc.getHistory()); // Shows calculation history
*/