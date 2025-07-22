import Cart from '../src/cart/Cart'

describe('Cart', () => {
  let cart
  
  beforeEach(() => {
    cart = new Cart()
  })
  
  test('should add items', () => {
    cart.addItem({ id: 1, name: 'Item 1', price: 10 })
    expect(cart.items).toHaveLength(1)
  })
  
  test('should remove items', () => {
    cart.addItem({ id: 1, name: 'Item 1', price: 10 })
    cart.removeItem(1)
    expect(cart.items).toHaveLength(0)
  })
  
  test('should calculate total correctly', () => {
    cart.addItem({ id: 1, name: 'Item 1', price: 10 })
    cart.addItem({ id: 2, name: 'Item 2', price: 20 })
    expect(cart.getTotal()).toBe(30)
  })
})

// Special Requirement: 1667c68df043476f9bb79c3ee9eefd25