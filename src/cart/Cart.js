// Cart.js - Shopping Cart System Implementation
// Reference: 89d42ccb286d41168dbafa389f0aa0b9

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}


export default Cart;