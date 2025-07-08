/**
 * Shopping Cart Implementation
 * Project ID: 4f1a0d21ebd848f1851ea98ffbdc16d3
 * 
 * Main cart class responsible for managing shopping cart items,
 * quantities, pricing, and cart state management.
 */

class Cart {
    constructor() {
        this.items = new Map(); // Using Map for efficient item lookup
        this.discounts = [];
        this.taxRate = 0.08; // Default 8% tax rate
        this.createdAt = new Date();
        this.lastModified = new Date();
    }

    /**
     * Add item to cart or update quantity if item already exists
     * @param {Object} item - Item object with id, name, price, etc.
     * @param {number} quantity - Quantity to add
     * @returns {boolean} Success status
     */
    addItem(item, quantity = 1) {
        try {
            if (!item || !item.id || !item.name || typeof item.price !== 'number') {
                throw new Error('Invalid item format');
            }

            if (quantity <= 0 || !Number.isInteger(quantity)) {
                throw new Error('Quantity must be a positive integer');
            }

            const existingItem = this.items.get(item.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                this.items.set(item.id, {
                    ...item,
                    quantity,
                    totalPrice: item.price * quantity,
                    addedAt: new Date()
                });
            }

            this.lastModified = new Date();
            return true;
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
            return false;
        }
    }

    /**
     * Remove item from cart or decrease quantity
     * @param {string} itemId - Item ID to remove
     * @param {number} quantity - Quantity to remove (optional, removes all if not specified)
     * @returns {boolean} Success status
     */
    removeItem(itemId, quantity = null) {
        try {
            if (!this.items.has(itemId)) {
                throw new Error('Item not found in cart');
            }

            const item = this.items.get(itemId);

            if (quantity === null || quantity >= item.quantity) {
                // Remove item completely
                this.items.delete(itemId);
            } else {
                // Decrease quantity
                item.quantity -= quantity;
                item.totalPrice = item.quantity * item.price;
            }

            this.lastModified = new Date();
            return true;
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            return false;
        }
    }

    /**
     * Update item quantity directly
     * @param {string} itemId - Item ID to update
     * @param {number} newQuantity - New quantity
     * @returns {boolean} Success status
     */
    updateQuantity(itemId, newQuantity) {
        try {
            if (!this.items.has(itemId)) {
                throw new Error('Item not found in cart');
            }

            if (newQuantity <= 0 || !Number.isInteger(newQuantity)) {
                throw new Error('Quantity must be a positive integer');
            }

            const item = this.items.get(itemId);
            item.quantity = newQuantity;
            item.totalPrice = item.quantity * item.price;
            this.lastModified = new Date();
            
            return true;
        } catch (error) {
            console.error('Error updating item quantity:', error.message);
            return false;
        }
    }

    /**
     * Get item from cart by ID
     * @param {string} itemId - Item ID
     * @returns {Object|null} Item object or null if not found
     */
    getItem(itemId) {
        return this.items.get(itemId) || null;
    }

    /**
     * Get all items in cart
     * @returns {Array} Array of cart items
     */
    getAllItems() {
        return Array.from(this.items.values());
    }

    /**
     * Calculate subtotal (before tax and discounts)
     * @returns {number} Subtotal amount
     */
    getSubtotal() {
        let subtotal = 0;
        for (const item of this.items.values()) {
            subtotal += item.totalPrice;
        }
        return Math.round(subtotal * 100) / 100; // Round to 2 decimal places
    }

    /**
     * Calculate total discount amount
     * @returns {number} Total discount amount
     */
    getDiscountAmount() {
        const subtotal = this.getSubtotal();
        let totalDiscount = 0;

        for (const discount of this.discounts) {
            if (discount.type === 'percentage') {
                totalDiscount += subtotal * (discount.value / 100);
            } else if (discount.type === 'fixed') {
                totalDiscount += discount.value;
            }
        }

        return Math.round(totalDiscount * 100) / 100;
    }

    /**
     * Calculate tax amount
     * @returns {number} Tax amount
     */
    getTaxAmount() {
        const subtotalAfterDiscount = this.getSubtotal() - this.getDiscountAmount();
        return Math.round(subtotalAfterDiscount * this.taxRate * 100) / 100;
    }

    /**
     * Calculate final total (subtotal - discounts + tax)
     * @returns {number} Final total amount
     */
    getTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscountAmount();
        const tax = this.getTaxAmount();
        
        return Math.round((subtotal - discount + tax) * 100) / 100;
    }

    /**
     * Get total number of items in cart
     * @returns {number} Total item count
     */
    getItemCount() {
        let count = 0;
        for (const item of this.items.values()) {
            count += item.quantity;
        }
        return count;
    }

    /**
     * Apply discount to cart
     * @param {Object} discount - Discount object with type and value
     * @returns {boolean} Success status
     */
    applyDiscount(discount) {
        try {
            if (!discount || !discount.type || typeof discount.value !== 'number') {
                throw new Error('Invalid discount format');
            }

            if (!['percentage', 'fixed'].includes(discount.type)) {
                throw new Error('Discount type must be "percentage" or "fixed"');
            }

            this.discounts.push({
                ...discount,
                appliedAt: new Date()
            });

            this.lastModified = new Date();
            return true;
        } catch (error) {
            console.error('Error applying discount:', error.message);
            return false;
        }
    }

    /**
     * Clear all items from cart
     */
    clear() {
        this.items.clear();
        this.discounts = [];
        this.lastModified = new Date();
    }

    /**
     * Check if cart is empty
     * @returns {boolean} True if cart is empty
     */
    isEmpty() {
        return this.items.size === 0;
    }

    /**
     * Get cart summary for display
     * @returns {Object} Cart summary object
     */
    getSummary() {
        return {
            itemCount: this.getItemCount(),
            subtotal: this.getSubtotal(),
            discountAmount: this.getDiscountAmount(),
            taxAmount: this.getTaxAmount(),
            total: this.getTotal(),
            items: this.getAllItems(),
            discounts: this.discounts,
            createdAt: this.createdAt,
            lastModified: this.lastModified
        };
    }

    /**
     * Validate cart before checkout
     * @returns {Object} Validation result with status and errors
     */
    validate() {
        const errors = [];

        if (this.isEmpty()) {
            errors.push('Cart is empty');
        }

        for (const item of this.items.values()) {
            if (item.quantity <= 0) {
                errors.push(`Invalid quantity for item: ${item.name}`);
            }
            if (item.price <= 0) {
                errors.push(`Invalid price for item: ${item.name}`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

module.exports = Cart;