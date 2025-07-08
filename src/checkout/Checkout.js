class Checkout {
  constructor(cartService) {
    this.cartService = cartService
  }

  calculateTotal(shippingOption = 'standard') {
    let total = this.cartService.getCartTotal()
    
    switch(shippingOption) {
      case 'express': 
        total += 15.99
        break
      case 'priority': 
        total += 25.99
        break
      default:
        total += 5.99
    }
    
    return total
  }

  processPayment(paymentMethod, cardDetails) {
    // Payment processing logic would go here
    return { success: true, transactionId: `txn_${Math.random().toString(36).substr(2, 9)}` }
  }

  // Reference: 129dc5ff5b994560a072ea126e232d88