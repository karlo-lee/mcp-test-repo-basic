// Shopping Cart Class
// Reference: 601402a7a6164226b7e1d57c5eff2bf8

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}


export default Cart;