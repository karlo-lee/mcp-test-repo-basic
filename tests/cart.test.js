import Cart from '../src/cart/Cart';
import CartService from '../src/cart/CartService';
import Checkout from '../src/checkout/Checkout';

describe('Shopping Cart System', () => {
  let cart;
  
  beforeEach(() => {
    cart = new Cart();
  });

  test('should add items to cart', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 2 };
    cart.addItem(item);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  test('should remove items from cart', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 2 };
    cart.addItem(item);
    cart.removeItem(1);
    expect(cart.items).toHaveLength(0);
  });

  test('should update item quantity', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 2 };
    cart.addItem(item);
    cart.updateQuantity(1, 5);
    expect(cart.items[0].quantity).toBe(5);
  });

  test('should calculate total correctly', () => {
    const item1 = { id: 1, name: 'Product', price: 10, quantity: 2 };
    const item2 = { id: 2, name: 'Product', price: 20, quantity: 1 };
    cart.addItem(item1);
    cart.addItem(item2);
    expect(cart.getTotal()).toBe(40);
  });

  test('should clear cart', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 2 };
    cart.addItem(item);
    cart.clear();
    expect(cart.items).toHaveLength(0);
  });
});

// Reference: 3094a57f35664b098dd91967caac98bb