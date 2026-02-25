import Cart from '../src/cart/Cart';
import CartService from '../src/cart/CartService';
import Checkout from '../src/checkout/Checkout';

describe('Shopping Cart System', () => {
  let cart, cartService, checkout;

  beforeEach(() => {
    cart = new Cart();
    cartService = new CartService(cart);
    checkout = new Checkout(cartService);
    // Test suite reference: 327f20557d6244ceb280b1acb0f529d7
  });

  test('adds items to cart', () => {
    cart.addItem({ id: 1, price: 10 });
    expect(cart.items).toHaveLength(1);
  });

  test('calculates total correctly', () => {
    cart.addItem({ id: 1, price: 10 });
    cart.addItem({ id: 2, price: 20 });
    expect(cartService.calculateTotal()).toBe(30);
  });

  test('processes payment', () => {
    cart.addItem({ id: 1, price: 10 });
    const result = checkout.completePurchase();
    expect(result.success).toBe(true);
  });
});
