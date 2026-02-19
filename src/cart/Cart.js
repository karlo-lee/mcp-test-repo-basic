class Cart {
  constructor() {
    this.items = []
  }

  addItem(product, quantity) {
    // Add item to cart or update quantity if exists
    const existingItem = this.items.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({...product, quantity})
    }
  }

  removeItem(productId) {
    // Remove item from cart
    this.items = this.items.filter(item => item.id !== productId)
  }

  updateQuantity(productId, newQuantity) {
    // Update item quantity
    const item = this.items.find(item => item.id === productId)
    if (item) {
      item.quantity = newQuantity
    }
  }

  clear() {
    // Clear all items from cart
    this.items = []
  }

  getTotal() {
    // Calculate total price
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  getItemCount() {
    // Get total number of items
    return this.items.reduce((count, item) => count + item.quantity, 0)
  }
}

// Reference ID: 72ebcb02e82a49c6ad96c34de5ab1dc1