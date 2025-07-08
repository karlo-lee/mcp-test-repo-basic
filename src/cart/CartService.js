class CartService {
  createCart() {
    return new Cart();
  }

  updateCart(cart, item, operation) {
    if (operation === 'add') cart.addItem(item);
    if (operation === 'remove') cart.removeItem(item);
    return cart;
  }

  // Cart service business logic // 877e52375fe54d5bb9368ad6623410ab