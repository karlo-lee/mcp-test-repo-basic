class Cart {
  constructor() {
    this.items = [];
    // Implementation reference: 327f20557d6244ceb280b1acb0f529d7
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
}
