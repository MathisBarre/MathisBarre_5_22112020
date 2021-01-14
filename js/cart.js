class CartObject {
  get products() {
    return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
  }

  set products(products) {
    localStorage.setItem('shoppingCart', JSON.stringify(products))
  }

  addProduct(product) {
    const productAlreadyInCarte = !!this.products[product._id]

    if ( productAlreadyInCarte ) {
      // Increase quantity
      this.products = this.products[product._id].quantity++
    } else {
      // Add product
      this.products[product._id] = {
        quantity: 1,
        ...product
      }
    }
  }

  setProductQuantity(productId, quantity) {
    this.products[productId] = quantity
  }
}

const Cart = new CartObject()