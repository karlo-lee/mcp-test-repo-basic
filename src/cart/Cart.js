// Shopping Cart Class Implementation
// Reference: b87bcb0f19d6474497e5753589167eba

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
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}


export default Cart;