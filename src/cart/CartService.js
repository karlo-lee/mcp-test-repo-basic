/* 8b9f7f75809b4506bc4900a6968ab6a0 */
const Cart = require('./Cart');

class CartService {
  constructor() {
    this.cart = new Cart();
  }

  addItem(item) {
    // Business logic could go here (e.g., validate item)
    this.cart.addItem(item);
  }

  removeItem(itemId) {
    this.cart.removeItem(itemId);
  }

  getTotal() {
    return this.cart.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cart.clear();
  }
}

module.exports = CartService;
