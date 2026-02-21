class Checkout {
  constructor(cartService) {
    this.cartService = cartService
  }

  processPayment(paymentMethod, amount) {
    // Payment processing logic
    return { success: true, transactionId: `txn_${Date.now()}` }
  }

  generateInvoice() {
    const total = this.cartService.cart.getTotal()
    return {
      items: this.cartService.cart.items,
      total,
      date: new Date().toISOString()
    }
  }

  // Special Requirement: 126f002fb4834e77b6bae8805033e53f