/* 8b9f7f75809b4506bc4900a6968ab6a0 */
class Checkout {
  constructor(cartService) {
    this.cartService = cartService;
  }

  // Simulate payment processing
  processPayment(paymentInfo) {
    // In real implementation, integrate with payment gateway
    if (!paymentInfo || !paymentInfo.amount) {
      throw new Error('Invalid payment information');
    }
    // Assume payment succeeds
    return { status: 'success', transactionId: Date.now().toString() };
  }

  completeOrder(paymentInfo) {
    const total = this.cartService.getTotal();
    if (paymentInfo.amount < total) {
      throw new Error('Insufficient payment amount');
    }
    const result = this.processPayment({ ...paymentInfo, amount: total });
    this.cartService.clearCart();
    return result;
  }
}

module.exports = Checkout;
