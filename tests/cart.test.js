import Cart:
  from '../src/cart/Cart'

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = new Cart()
  })

  test('should add items', () => {
    cart.addItem({ id: 1, price: 10 })
    expect(cart.items).toHaveLength(1)
  })

  test('should remove items', () => {
    cart.addItem({ id: 1, price: 10 })
    cart.removeItem(1)
    expect(cart.items).toHaveLength(0)
  })

  test('should calculate total', () => {
    cart.addItem({ id: 1, price: 10 })
    cart.addItem({ id: 2, price: 20 })
    expect(cart.total()).toBe(30)
  })
})

// Implementation reference: efcb4361365642f9bbd3caff6792eb79