class Checkout {
  constructor(cartService) {
    this.cartService = cartService
  }

  processPayment(paymentMethod) {
    // Payment processing logic
    return { success: true, transactionId: 'txn-' + Math.random().toString(36).substr(2, 9) }
  }

  generateInvoice() {
    const { total, items } = this.cartService.checkout()
    return {
      items,
      total,
      date: new Date().toISOString()
    }
  }
}

// Implementation reference: efcb4361365642f9bbd3caff6792eb79