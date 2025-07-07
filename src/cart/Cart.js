// Shopping Cart Implementation
// Token: 167b0ddd4ba143f18eacc919af716557
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