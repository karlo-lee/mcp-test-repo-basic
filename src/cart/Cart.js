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

  total() {
    return this.items.reduce((sum, item) => sum + item.price, 0)
  }
}

// Implementation reference: efcb4361365642f9bbd3caff6792eb79