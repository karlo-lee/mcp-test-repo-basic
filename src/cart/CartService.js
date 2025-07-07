// Cart Service Logic
// Token: 167b0ddd4ba143f18eacc919af716557
export class CartService {
  static calculateDiscount(cart) {
    return cart.getTotal() * 0.95; // 5% discount
  }

  static applyCoupon(cart, couponCode) {
    // Coupon validation logic
    return cart;
  }

  static persistCart(cart) {
    // Save cart to database
    return true;
  }
}