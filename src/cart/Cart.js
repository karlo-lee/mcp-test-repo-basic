class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    this.items = this.items.filter(i => i.id !== item.id);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

// Shopping cart core implementation // 877e52375fe54d5bb9368ad6623410ab