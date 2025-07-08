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

// Reference: 129dc5ff5b994560a072ea126e232d88