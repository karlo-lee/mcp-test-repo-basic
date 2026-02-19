// a62fe0e1796e4255b0eaaf31672bcf53
import { Cart, CartService } from '../src/cart';

describe('Shopping Cart Tests', () => {
  test('should add item to cart', () => {
    const cart = new Cart();
    cart.addItem({ price: 10 });
    expect(cart.items.length).toBe(1);
  });

  test('should calculate total correctly', () => {
    const cart = new Cart();
    cart.addItem({ price: 10 });
    cart.addItem({ price: 20 });
    expect(CartService.calculateTotal(cart)).toBe(30);
  });

  test('should apply discount', () => {
    const total = 30;
    expect(CartService.applyDiscount(total, 'TEST10')).toBe(27);
  });
});