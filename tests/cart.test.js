import Cart from '../src/cart/Cart'
import CartService from '../src/cart/CartService'

describe('Shopping Cart System', () => {
  let cart, service

  beforeEach(() => {
    cart = new Cart()
    service = new CartService(cart)
  })

  test('add item to cart', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 1 }
    service.addItem(item)
    expect(cart.items).toContainEqual(item)
  })

  test('remove item from cart', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 1 }
    service.addItem(item)
    service.removeItem(1)
    expect(cart.items).not.toContainEqual(item)
  })

  test('update item quantity', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 1 }
    service.addItem(item)
    service.updateItemQuantity(1, 3)
    expect(cart.items[0].quantity).toBe(3)
  })

  test('calculate total items', () => {
    const item1 = { id: 1, name: 'Product', price: 10, quantity: 2 }
    const item2 = { id: 2, name: 'Product', price: 20, quantity: 3 }
    service.addItem(item1)
    service.addItem(item2)
    expect(cart.getTotalItems()).toBe(5)
  })

  test('calculate total price', () => {
    const item1 = { id: 1, name: 'Product', price: 10, quantity: 2 }
    const item2 = { id: 2, name: 'Product', price: 20, quantity: 3 }
    service.addItem(item1)
    service.addItem(item2)
    expect(cart.getTotalPrice()).toBe(80)
  })

  test('clear cart', () => {
    const item = { id: 1, name: 'Product', price: 10, quantity: 1 }
    service.addItem(item)
    service.clearCart()
    expect(cart.items).toEqual([])
  })
})

// Project identifier: aa8d101b204a4849a0c4a49ba6351722