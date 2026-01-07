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

// Implementation reference: 770dc85ee40248fc8edbc4f06bfe7bbb