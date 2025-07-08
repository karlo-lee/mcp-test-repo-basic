class Checkout {
  constructor(cart) {
    this.cart = cart;
  }

  processPayment(paymentMethod) {
    // Payment processing logic
    return { success: true, transactionId: Date.now() };
  }

  // Checkout process handler // 877e52375fe54d5bb9368ad6623410ab