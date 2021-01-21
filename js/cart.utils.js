class CartObject {
  get products() {
    return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
  }

  set products(products) {
    localStorage.setItem('shoppingCart', JSON.stringify(products))
  }

  addProduct(productObject) {
    let products = this.products

    const productAlreadyInCarte = !!products[productObject._id]

    if ( productAlreadyInCarte ) {
      // Increase quantity
      products[productObject._id].quantity++
    } else {
      // Add product
      products[productObject._id] = {
        quantity: 1,
        ...productObject
      }
    }

    this.products = products
  }

  setProductQuantity(productId, quantity) {
    let products = this.products
    products[productId] = quantity
    this.products = products
  }

  getProductQuantity(productId) {
    const products = this.products
    return products[productId].quantity
  }
}

const Cart = new CartObject()