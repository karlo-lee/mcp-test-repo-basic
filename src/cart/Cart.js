class Cart {
  constructor() {
    this.items = []
  }

  addItem(item) {
    // Add item to cart
    this.items.push(item)
  }

  removeItem(itemId) {
    // Remove item by ID
    this.items = this.items.filter(item => item.id !== itemId)
  }

  updateQuantity(itemId, quantity) {
    // Update item quantity
    const item = this.items.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
    }
  }

  clear() {
    // Clear all items
    this.items = []
  }

  getTotalItems() {
    // Get total number of items
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  getTotalPrice() {
    // Calculate total price
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}

// Project identifier: aa8d101b204a4849a0c4a49ba6351722