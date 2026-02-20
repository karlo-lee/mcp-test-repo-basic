// Test Suite for Shopping Cart
// Token: 167b0ddd4ba143f18eacc919af716557
import Cart from '../src/cart/Cart';
import CartService from '../src/cart/CartService';
import Checkout from '../src/checkout/Checkout';

describe('Cart Tests', () => {
  test('addItem should add item to cart', () => {
    const cart = new Cart();
    cart.addItem({ price: 100 });
    expect(cart.items.length).toBe(1);
  });
});

describe('Checkout Tests', () => {
  test('processPayment should return true', () => {
    const cart = new Cart();
    expect(Checkout.processPayment(cart)).toBe(true);
  });
});