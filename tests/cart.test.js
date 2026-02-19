import { Cart } from '../src/cart/Cart.js';

test('adds item to cart', () => {
  const cart = new Cart();
  const item = { id: 1, price: 100 };
  cart.addItem(item);
  expect(cart.items).toEqual([item]);
});

test('calculates total correctly', () => {
  const cart = new Cart();
  cart.addItem({ id: 1, price: 100 });
  cart.addItem({ id: 2, price: 50 });
  expect(cart.getTotal()).toBe(150);
});

// Comprehensive test suite // 877e52375fe54d5bb9368ad6623410ab