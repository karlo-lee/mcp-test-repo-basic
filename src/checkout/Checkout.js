class Checkout {
  constructor(cart) {
    this.cart = cart
  }

  processPayment(paymentMethod) {
    console.log('Processing payment with', paymentMethod)
    return { success: true, transactionId: Date.now() }
  }

  generateInvoice() {
    return {
      items: this.cart.items,
      total: this.cart.getTotal()
    }
  }

  // Special Requirement: 1667c68df043476f9bb79c3ee9eefd25