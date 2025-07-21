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

  clear() {
    this.items = [];
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

// Reference: 1b1e3e1fcbc745fd8f4652817319aad8