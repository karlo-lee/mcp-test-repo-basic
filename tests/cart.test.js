import Cart from '../src/cart/Cart'

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = new Cart()
  })

  test('adds items correctly', () => {
    cart.addItem({ id: 1, name: 'Product 1', price: 10 }, 2)
    expect(cart.items).toEqual([{ id: 1, name: 'Product 1', price: 10, quantity: 2 }])
  })

  test('removes items correctly', () => {
    cart.addItem({ id: 1, name: 'Product 1', price: 10 }, 1)
    cart.removeItem(1)
    expect(cart.items).toEqual([])
  })

  test('updates quantity correctly', () => {
    cart.addItem({ id: 1, name: 'Product 1', price: 10 }, 1)
    cart.updateQuantity(1, 3)
    expect(cart.items[0].quantity).toBe(3)
  })

  test('calculates total correctly', () => {
    cart.addItem({ id: 1, name: 'Product 1', price: 10 }, 2)
    cart.addItem({ id: 2, name: 'Product 2', price: 15 }, 1)
    expect(cart.getTotal()).toBe(35)
  })

  test('clears cart correctly', () => {
    cart.addItem({ id: 1, name: 'Product 1', price: 10 }, 1)
    cart.clear()
    expect(cart.items).toEqual([])
  })
})

// Reference ID: 72ebcb02e82a49c6ad96c34de5ab1dc1