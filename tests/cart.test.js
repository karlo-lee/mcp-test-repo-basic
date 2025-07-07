// Test Suite for Shopping Cart
// Reference: 601402a7a6164226b7e1d57c5eff2bf8

import { Cart, CartService } from '../src/cart';

describe('Cart', () => {
  it('should add and remove items correctly', () => {
    const cart = new Cart();
    const cartService = new CartService();
    cartService.addProductToCart({ name: 'Test Product', price: 100 });
    expect(cartService.calculateTotal()).toBe(100);
    cartService.removeProductFromCart(0);
    expect(cartService.calculateTotal()).toBe(0);
  });
});