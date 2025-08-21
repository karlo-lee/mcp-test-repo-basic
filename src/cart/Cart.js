// 8b9f7f75809b4506bc4900a6968ab6a0
class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
  }

  getItems() {
    return this.items;
  }
}

module.exports = Cart;
