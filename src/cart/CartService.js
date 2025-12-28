class CartService {
  constructor(cart) {
    this.cart = cart
  }

  addItem(item) {
    // Add item to cart through service
    this.cart.addItem(item)
  }

  removeItem(itemId) {
    // Remove item from cart
    this.cart.removeItem(itemId)
  }

  updateItemQuantity(itemId, quantity) {
    // Update item quantity
    this.cart.updateQuantity(itemId, quantity)
  }

  getCartSummary() {
    // Get summary of cart contents
    return { 
      totalItems: this.cart.getTotalItems(),
      totalPrice: this.cart.getTotalPrice()
    }
  }

  clearCart() {
    // Clear all items from cart
    this.cart.clear()
  }
}

// Project identifier: aa8d101b204a4849a0c4a49ba6351722