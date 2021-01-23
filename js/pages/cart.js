(() => {
  // Stop script here if no product
  if (!localStorage.getItem('shoppingCart')) return

  // Remove no product text
  document.getElementById('noProduct').style.display = 'none'
  
  // Get product from local storage
  const productsObject = JSON.parse(localStorage.getItem('shoppingCart'))

  // Display all products
  const productList = Object.values(productsObject)
  productList.forEach(product => {
    displayProduct(product)
  })
})()

// Display one product from product template
function displayProduct(product) {
  // Get template
  const templateElt = document.getElementById('product')

  // Clone template
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  const quantityElt = cloneElt.getElementById('productQuantity')
  cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productDescription').textContent = product.description
  quantityElt.selectedIndex = product.quantity - 1

  // Add events
  quantityElt.addEventListener('change', (e) => {
    e.preventDefault()
    Cart.updateProductQuantity(product._id, e.target.selectedIndex + 1)
  })

  // const productInCartQuantity = this.products[product._id].quantity
  // cloneElt.getElementById('productQuantityPlus').addEventListener('click', (e) => {
  //   e.preventDefault()
  //   updateProductQuantity(product._id, productInCartQuantity)
  // })
  // cloneElt.getElementById('productQuantityMinus').addEventListener('click', (e) => {
  //   e.preventDefault()
  //   updateProductQuantity(product._id, productInCartQuantity)
  // })

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}