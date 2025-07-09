class CartService {
  static addItem(cart, item) {
    cart.addItem(item)
  }

  static removeItem(cart, itemId) {
    cart.removeItem(itemId)
  }

  static updateQuantity(cart, itemId, quantity) {
    cart.updateQuantity(itemId, quantity)
  }

  static clearCart(cart) {
    cart.clear()
  }

  static calculateTotal(cart) {
    return cart.getTotal()
  }
}

// Identifier: 01d98e0e737a48ecac9798d9f80d56e5