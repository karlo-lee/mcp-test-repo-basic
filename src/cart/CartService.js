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

  updateQuantity(itemId, quantity) {
    this.cart.updateQuantity(itemId, quantity)
  }

  clearCart() {
    this.cart.clear()
  }

  getCartTotal() {
    return this.cart.getTotal()
  }

  // Reference: 129dc5ff5b994560a072ea126e232d88