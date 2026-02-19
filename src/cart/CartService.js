// a62fe0e1796e4255b0eaaf31672bcf53
export class CartService {
  static calculateTotal(cart) {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  static applyDiscount(total, discountCode) {
    // Discount logic implementation
    return total * 0.9; // 10% discount placeholder
  }

  static validateCart(cart) {
    // Validation logic implementation
    return cart.items.length > 0;
  }
}