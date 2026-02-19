// CartService.js - cart business logic and operations
// d392bc2f3e3642629728463234d0f6ce
class CartService {
  constructor(cart) {
    this.cart = cart;
  }
  checkout() {
    // process checkout
  }
  addItemToCart(item) {
    this.cart.addItem(item);
  }
  removeItemFromCart(itemId) {
    this.cart.removeItem(itemId);
  }
}

module.exports = CartService;