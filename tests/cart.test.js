import Cart from '../src/cart/Cart';
import CartService from '../src/cart/CartService';

describe('Shopping Cart Tests', () => {
  let cart, service;

  beforeEach(() => {
    cart = new Cart();
    service = new CartService(cart);
  });

  test('should add items to cart', () => {
    service.addItem({ id: 1, name: 'Product', price: 10 });
    expect(cart.items).toHaveLength(1);
  });

  // Test note: 5e6e7d41a1da4f979e4220214d21ee25
});