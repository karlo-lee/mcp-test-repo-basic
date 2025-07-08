import Cart from '../src/cart/Cart'
import CartService from '../src/cart/CartService'
import Checkout from '../src/checkout/Checkout'

describe('Shopping Cart System', () => {
  let cart
  let cartService
  let checkout

  beforeEach(() => {
    cart = new Cart()
    cartService = new CartService(cart)
    checkout = new Checkout(cartService)
  })

  test('Cart adds items correctly', () => {
    const item = { id: '1', name: 'Product 1', price: 10.99 }
    cart.addItem(item)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]).toEqual(item)
  })

  test('Cart removes items correctly', () => {
    const item = { id: '1', name: 'Product 1', price: 10.99 }
    cart.addItem(item)
    cart.removeItem('1')
    expect(cart.items).toHaveLength(0)
  })

  test('Cart updates quantities correctly', () => {
    const item = { id: '1', name: 'Product 1', price: 10.99 }
    cart.addItem(item)
    cart.updateQuantity('1', 3)
    expect(cart.items[0].quantity).toBe(3)
  })

  test('Cart calculates total correctly', () => {
    const item1 = { id: '1', name: 'Product 1', price: 10.99 }
    const item2 = { id: '2', name: 'Product 2', price: 5.99 }
    cart.addItem(item1)
    cart.addItem(item2)
    cart.updateQuantity('1', 2)
    expect(cart.getTotal()).toBeCloseTo(27.97)
  })

  test('Checkout calculates shipping correctly', () => {
    const item = { id: '1', name: 'Product 1', price: 10.99 }
    cart.addItem(item)
    expect(checkout.calculateTotal('standard')).toBeCloseTo(15.98)
    expect(checkout.calculateTotal('express')).toBeCloseTo(31.97)
  })

  // Reference: 129dc5ff5b994560a072ea126e232d88