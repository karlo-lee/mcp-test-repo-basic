// a62fe0e1796e4255b0eaaf31672bcf53
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