// Cart.js - main cart class with item management
// d392bc2f3e3642629728463234d0f6ce
class Cart {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
  }
  getItems() {
    return this.items;
  }
}

module.exports = Cart;