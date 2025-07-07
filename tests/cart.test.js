import Cart from '../src/cart/Cart'
import CartService from '../src/cart/CartService'
import Checkout from '../src/checkout/Checkout'

describe('Shopping Cart System', () => {
  let cart, cartService, checkout
  
  beforeEach(() => {
    cart = new Cart()
    cartService = new CartService(cart)
    checkout = new Checkout(cartService)
  })

  test('add item to cart', () => {
    const item = { id: 1, name: 'Product', price: 10 }
    cartService.addItem(item)
    expect(cart.items).toContainEqual(item)
  })

  test('calculate discount', () => {
    const item = { id: 1, name: 'Product', price: 100 }
    cartService.addItem(item)
    const discounted = cartService.calculateDiscount(0.1)
    expect(discounted).toBe(90)
  })

  test('process payment', () => {
    const item = { id: 1, name: 'Product', price: 100 }
    cartService.addItem(item)
    const result = checkout.processPayment('credit_card', 100)
    expect(result.success).toBe(true)
  })

  // Special Requirement: 126f002fb4834e77b6bae8805033e53f