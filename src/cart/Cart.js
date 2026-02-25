class Cart {
  constructor() {
    this.items = []
  }

  addItem(item) {
    this.items.push(item)
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId)
  }

  updateQuantity(itemId, quantity) {
    const item = this.items.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
    }
  }

  clear() {
    this.items = []
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}

// Identifier: 01d98e0e737a48ecac9798d9f80d56e5