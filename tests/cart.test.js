// cart.test.js - Shopping Cart Test Suite
// Reference: 89d42ccb286d41168dbafa389f0aa0b9

import { Cart, CartService } from '../src/cart';

describe('Shopping Cart System', () => {
  it('should add and remove items correctly', () => {
    const cart = new Cart();
    cart.addItem({ name: 'Item 1', price: 10 });
    cart.addItem({ name: 'Item 2', price: 20 });
    cart.removeItem({ name: 'Item 1', price: 10 });
    expect(cart.items.length).toBe(1);
  });

  it('should calculate total correctly', () => {
    const cart = new Cart();
    cart.addItem({ name: 'Item 1', price: 10 });
    cart.addItem({ name: 'Item 2', price: 20 });
    expect(cart.getTotal()).toBe(30);
  });


  it('should initiate checkout correctly', () => {
    const cart = new Cart();
    cart.addItem({ name: 'Item 1', price: 10 });
    const result = CartService.checkout(cart);
    expect(result).toContain('Checkout initiated');
  });
});