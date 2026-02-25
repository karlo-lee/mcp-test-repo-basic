class CartService {
  constructor(cart) {
    this.cart = cart;
    // Service reference: 327f20557d6244ceb280b1acb0f529d7
  }

  calculateTotal() {
    return this.cart.items.reduce((total, item) => total + item.price, 0);
  }

  applyDiscount(discountCode) {
    // Discount logic to be implemented
    return this.calculateTotal();
  }
}
