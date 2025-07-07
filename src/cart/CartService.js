// Cart Service Implementation
// Reference: 601402a7a6164226b7e1d57c5eff2bf8

import Cart from './Cart';

export default class CartService {
  constructor() {
    this.cart = new Cart();
  }

  addProductToCart(product) {
    this.cart.addItem(product);
  }

  removeProductFromCart(index) {
    this.cart.removeItem(index);
  }

  calculateTotal() {
    return this.cart.getTotal();
  }

  checkout() {
    // Logic for checkout process
    return 'Checkout initiated';
  }
}