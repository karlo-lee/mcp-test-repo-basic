import Cart from '../src/cart/Cart'
import CartService from '../src/cart/CartService'
import Checkout from '../src/checkout/Checkout'

describe('Shopping Cart System', () => {
  let cart

  beforeEach(() => {
    cart = new Cart()
  })

  test('should add items to cart', () => {
    const item = { id: 1, name: 'Product', price: 10.99 }
    CartService.addItem(cart, item)
    expect(cart.items).toHaveLength(1)
  })

  test('should remove items from cart', () => {
    const item = { id: 1, name: 'Product', price: 10.99 }
    CartService.addItem(cart, item)
    CartService.removeItem(cart, 1)
    expect(cart.items).toHaveLength(0)
  })

  test('should calculate total correctly', () => {
    const item1 = { id: 1, name: 'Product 1', price: 10.99 }
    const item2 = { id: 2, name: 'Product 2', price: 5.99 }
    CartService.addItem(cart, item1)
    CartService.addItem(cart, item2)
    expect(cart.getTotal()).toBeCloseTo(16.98)
  })

  test('checkout should generate order correctly', () => {
    const item = { id: 1, name: 'Product', price: 10.99 }
    CartService.addItem(cart, item)
    const checkout = new Checkout(cart)
    const order = checkout.generateOrder()
    
    expect(order.subtotal).toBeCloseTo(10.99)
    expect(order.tax).toBeCloseTo(11.87)
    expect(order.grandTotal).toBeCloseTo(22.86)
  })
})

// Identifier: 01d98e0e737a48ecac9798d9f80d56e5