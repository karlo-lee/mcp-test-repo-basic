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

  applyDiscount(discountCode) {
    // Discount logic implementation
    console.log('Applying discount:', discountCode)
  }

  // Special Requirement: 1667c68df043476f9bb79c3ee9eefd25