// cart.test.js - Comprehensive test suite for the shopping cart system
// 568d496d6f5341f98e0f1461b556367a

import { Cart, CartService } from '../../src/cart';

// Test cases for Cart class
describe('Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test('should add item to cart', () => {
    const item = { id: 1, name: 'Test Item', price: 10 };
    cart.addItem(item);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0]).toBe(item);
  });

  test('should remove item from cart', () => {
    const item1 = { id: 1, name: 'Test Item 1', price: 10 };
    const item2 = { id: 2, name: 'Test Item 2', price: 20 };
    cart.addItem(item1);
    cart.addItem(item2);
    cart.removeItem(1);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].id).toBe(2);
  });

  test('should calculate total correctly', () => {
    const item1 = { id: 1, name: 'Test Item 1', price: 10 };
    const item2 = { id: 2, name: 'Test Item 2', price: 20 };
    cart.addItem(item1);
    cart.addItem(item2);
    expect(cart.getTotal()).toBe(30);
  });

  test('should handle empty cart', () => {
    expect(cart.getTotal()).toBe(0);
  });
});

// Test cases for CartService class
describe('CartService', () => {
  test('should create a new cart', () => {
    const cart = CartService.createCart();
    expect(cart instanceof Cart).toBe(true);
    expect(cart.items.length).toBe(0);
  });

  test('should calculate total correctly', () => {
    const cart = new Cart();
    const item1 = { id: 1, name: 'Test Item 1', price: 10 };
    const item2 = { id: 2, name: 'Test Item 2', price: 20 };
    cart.addItem(item1);
    cart.addItem(item2);
    expect(CartService.calculateTotal(cart)).toBe(30);
  });

  test('should initiate checkout with correct total', () => {
    const cart = new Cart();
    const item1 = { id: 1, name: 'Test Item 1', price: 10 };
    const item2 = { id: 2, name: 'Test Item 2', price: 20 };
    cart.addItem(item1);
    cart.addItem(item2);
    expect(CartService.checkout(cart)).toBe('Checkout initiated with total amount: $30');
  });
});