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

  calculateDiscount(discountRate) {
    const subtotal = this.cart.getTotal()
    return subtotal * (1 - discountRate)
  }

  // Special Requirement: 126f002fb4834e77b6bae8805033e53f