/**
 * Cart Service - Business Logic Layer
 * Project ID: 4f1a0d21ebd848f1851ea98ffbdc16d3
 * 
 * Handles cart operations orchestration, data validation,
 * external service integration, and comprehensive error handling.
 */

const Cart = require('./Cart');

class CartService {
    constructor(options = {}) {
        this.inventoryService = options.inventoryService;
        this.pricingService = options.pricingService;
        this.userService = options.userService;
        this.logger = options.logger || console;
        this.carts = new Map(); // In-memory cart storage (use database in production)
        this.sessionTimeout = options.sessionTimeout || 30 * 60 * 1000; // 30 minutes
    }

    /**
     * Create a new cart for a user session
     * @param {string} sessionId - User session ID
     * @param {string} userId - User ID (optional)
     * @returns {Promise<Cart>} New cart instance
     */
    async createCart(sessionId, userId = null) {
        try {
            if (!sessionId) {
                throw new Error('Session ID is required');
            }

            const cart = new Cart();
            cart.sessionId = sessionId;
            cart.userId = userId;
            cart.expiresAt = new Date(Date.now() + this.sessionTimeout);

            this.carts.set(sessionId, cart);
            this.logger.info(`Cart created for session: ${sessionId}`);

            return cart;
        } catch (error) {
            this.logger.error('Error creating cart:', error.message);
            throw error;
        }
    }

    /**
     * Get cart by session ID
     * @param {string} sessionId - User session ID
     * @returns {Promise<Cart|null>} Cart instance or null if not found
     */
    async getCart(sessionId) {
        try {
            const cart = this.carts.get(sessionId);
            
            if (!cart) {
                return null;
            }

            // Check if cart has expired
            if (cart.expiresAt && cart.expiresAt < new Date()) {
                this.carts.delete(sessionId);
                this.logger.info(`Expired cart removed for session: ${sessionId}`);
                return null;
            }

            return cart;
        } catch (error) {
            this.logger.error('Error retrieving cart:', error.message);
            throw error;
        }
    }

    /**
     * Add item to cart with inventory and pricing validation
     * @param {string} sessionId - User session ID
     * @param {Object} itemData - Item data to add
     * @param {number} quantity - Quantity to add
     * @returns {Promise<Object>} Operation result
     */
    async addItemToCart(sessionId, itemData, quantity = 1) {
        try {
            let cart = await this.getCart(sessionId);
            
            if (!cart) {
                cart = await this.createCart(sessionId);
            }

            // Validate item with inventory service
            if (this.inventoryService) {
                const inventoryCheck = await this.inventoryService.checkAvailability(
                    itemData.id, 
                    quantity
                );
                
                if (!inventoryCheck.available) {
                    throw new Error(`Insufficient inventory for item: ${itemData.name}`);
                }
            }

            // Get current pricing
            if (this.pricingService) {
                const currentPrice = await this.pricingService.getPrice(itemData.id);
                itemData.price = currentPrice;
            }

            // Validate item data
            const validationResult = this.validateItemData(itemData);
            if (!validationResult.isValid) {
                throw new Error(`Invalid item data: ${validationResult.errors.join(', ')}`);
            }

            // Add item to cart
            const success = cart.addItem(itemData, quantity);
            
            if (!success) {
                throw new Error('Failed to add item to cart');
            }

            // Update cart expiration
            cart.expiresAt = new Date(Date.now() + this.sessionTimeout);

            this.logger.info(`Item added to cart - Session: ${sessionId}, Item: ${itemData.id}, Quantity: ${quantity}`);

            return {
                success: true,
                cart: cart.getSummary(),
                message: 'Item added successfully'
            };

        } catch (error) {
            this.logger.error('Error adding item to cart:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Remove item from cart
     * @param {string} sessionId - User session ID
     * @param {string} itemId - Item ID to remove
     * @param {number} quantity - Quantity to remove (optional)
     * @returns {Promise<Object>} Operation result
     */
    async removeItemFromCart(sessionId, itemId, quantity = null) {
        try {
            const cart = await this.getCart(sessionId);
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            const success = cart.removeItem(itemId, quantity);
            
            if (!success) {
                throw new Error('Failed to remove item from cart');
            }

            this.logger.info(`Item removed from cart - Session: ${sessionId}, Item: ${itemId}`);

            return {
                success: true,
                cart: cart.getSummary(),
                message: 'Item removed successfully'
            };

        } catch (error) {
            this.logger.error('Error removing item from cart:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Update item quantity in cart
     * @param {string} sessionId - User session ID
     * @param {string} itemId - Item ID to update
     * @param {number} newQuantity - New quantity
     * @returns {Promise<Object>} Operation result
     */
    async updateItemQuantity(sessionId, itemId, newQuantity) {
        try {
            const cart = await this.getCart(sessionId);
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            // Check inventory availability for new quantity
            if (this.inventoryService) {
                const inventoryCheck = await this.inventoryService.checkAvailability(
                    itemId, 
                    newQuantity
                );
                
                if (!inventoryCheck.available) {
                    throw new Error('Insufficient inventory for requested quantity');
                }
            }

            const success = cart.updateQuantity(itemId, newQuantity);
            
            if (!success) {
                throw new Error('Failed to update item quantity');
            }

            this.logger.info(`Item quantity updated - Session: ${sessionId}, Item: ${itemId}, Quantity: ${newQuantity}`);

            return {
                success: true,
                cart: cart.getSummary(),
                message: 'Quantity updated successfully'
            };

        } catch (error) {
            this.logger.error('Error updating item quantity:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Apply discount to cart
     * @param {string} sessionId - User session ID
     * @param {Object} discountData - Discount data
     * @returns {Promise<Object>} Operation result
     */
    async applyDiscount(sessionId, discountData) {
        try {
            const cart = await this.getCart(sessionId);
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            // Validate discount
            const validationResult = this.validateDiscount(discountData);
            if (!validationResult.isValid) {
                throw new Error(`Invalid discount: ${validationResult.errors.join(', ')}`);
            }

            const success = cart.applyDiscount(discountData);
            
            if (!success) {
                throw new Error('Failed to apply discount');
            }

            this.logger.info(`Discount applied - Session: ${sessionId}, Type: ${discountData.type}, Value: ${discountData.value}`);

            return {
                success: true,
                cart: cart.getSummary(),
                message: 'Discount applied successfully'
            };

        } catch (error) {
            this.logger.error('Error applying discount:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Clear cart
     * @param {string} sessionId - User session ID
     * @returns {Promise<Object>} Operation result
     */
    async clearCart(sessionId) {
        try {
            const cart = await this.getCart(sessionId);
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.clear();
            this.logger.info(`Cart cleared - Session: ${sessionId}`);

            return {
                success: true,
                message: 'Cart cleared successfully'
            };

        } catch (error) {
            this.logger.error('Error clearing cart:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get cart summary
     * @param {string} sessionId - User session ID
     * @returns {Promise<Object>} Cart summary or error
     */
    async getCartSummary(sessionId) {
        try {
            const cart = await this.getCart(sessionId);
            
            if (!cart) {
                return {
                    success: false,
                    error: 'Cart not found'
                };
            }

            return {
                success: true,
                cart: cart.getSummary()
            };

        } catch (error) {
            this.logger.error('Error getting cart summary:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Validate cart before checkout
     * @param {string} sessionId - User session ID
     * @returns {Promise<Object>} Validation result
     */
    async validateCartForCheckout(sessionId) {
        try {
            const cart = await this.getCart(sessionId);
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            const validation = cart.validate();
            
            // Additional business logic validation
            if (validation.isValid && this.inventoryService) {
                for (const item of cart.getAllItems()) {
                    const inventoryCheck = await this.inventoryService.checkAvailability(
                        item.id, 
                        item.quantity
                    );
                    
                    if (!inventoryCheck.available) {
                        validation.isValid = false;
                        validation.errors.push(`Item "${item.name}" is no longer available in requested quantity`);
                    }
                }
            }

            return {
                success: true,
                validation
            };

        } catch (error) {
            this.logger.error('Error validating cart:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Clean up expired carts
     */
    cleanupExpiredCarts() {
        const now = new Date();
        let cleanedCount = 0;

        for (const [sessionId, cart] of this.carts.entries()) {
            if (cart.expiresAt && cart.expiresAt < now) {
                this.carts.delete(sessionId);
                cleanedCount++;
            }
        }

        if (cleanedCount > 0) {
            this.logger.info(`Cleaned up ${cleanedCount} expired carts`);
        }
    }

    /**
     * Validate item data
     * @param {Object} itemData - Item data to validate
     * @returns {Object} Validation result
     */
    validateItemData(itemData) {
        const errors = [];

        if (!itemData.id) {
            errors.push('Item ID is required');
        }

        if (!itemData.name) {
            errors.push('Item name is required');
        }

        if (typeof itemData.price !== 'number' || itemData.price <= 0) {
            errors.push('Valid price is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate discount data
     * @param {Object} discountData - Discount data to validate
     * @returns {Object} Validation result
     */
    validateDiscount(discountData) {
        const errors = [];

        if (!discountData.type) {
            errors.push('Discount type is required');
        }

        if (!['percentage', 'fixed'].includes(discountData.type)) {
            errors.push('Discount type must be "percentage" or "fixed"');
        }

        if (typeof discountData.value !== 'number' || discountData.value <= 0) {
            errors.push('Valid discount value is required');
        }

        if (discountData.type === 'percentage' && discountData.value > 100) {
            errors.push('Percentage discount cannot exceed 100%');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

module.exports = CartService;