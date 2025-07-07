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

  clear() {
    this.items = []
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0)
  }
}

// Special Requirement: 126f002fb4834e77b6bae8805033e53f