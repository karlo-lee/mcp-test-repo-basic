// Cart.js - Main cart class for item management
// 568d496d6f5341f98e0f1461b556367a

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

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}


export default Cart;