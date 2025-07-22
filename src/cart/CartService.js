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
    // Discount implementation
    return true
  }

  checkout() {
    return {
      total: this.cart.total(),
      items: this.cart.items
    }
  }
}

// Implementation reference: efcb4361365642f9bbd3caff6792eb79