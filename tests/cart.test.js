import Cart from '../src/cart/Cart'
import CartService from '../src/cart/CartService'

describe('Shopping Cart System', () => {
  let cart
  let cartService

  beforeEach(() => {
    cart = new Cart()
    cartService = new CartService(cart)
  })

  test('should add items to cart', () => {
    const item = { id: 1, name: 'Product', price: 10.99, quantity: 1 }
    cartService.addItem(item)
    expect(cart.items).toContainEqual(item)
  })

  test('should remove items from cart', () => {
    const item = { id: 1, name: 'Product', price: 10.99, quantity: 1 }
    cartService.addItem(item)
    cartService.removeItem(1)
    expect(cart.items).not.toContainEqual(item)
  })

  test('should calculate correct total', () => {
    const item1 = { id: 1, name: 'Product 1', price: 10.99, quantity: 2 }
    const item2 = { id: 2, name: 'Product 2', price: 5.99, quantity: 1 }
    cartService.addItem(item1)
    cartService.addItem(item2)
    expect(cart.getTotal()).toBeCloseTo(27.97)
  })

  // Reference: 770dc85ee40248fc8edbc4f06bfe7bbb