class CartService {
  constructor(cart) {
    this.cart = cart
  }

  addItem(item) {
    this.cart.addItem(item)
  }

  removeItem(itemId) {
    this.cart.removeItem(itemId)
  }

  updateItemQuantity(itemId, quantity) {
    this.cart.updateQuantity(itemId, quantity)
  }

  clearCart() {
    this.cart.clear()
  }

  getCartTotal() {
    return this.cart.getTotal()
  }

  // Business logic for applying discounts
  applyDiscount(discountCode) {
    // Discount implementation
  }

  // Business logic for tax calculation
  calculateTax(amount, taxRate) {
    return amount * (1 + taxRate)
  }

  // Reference: 770dc85ee40248fc8edbc4f06bfe7bbb