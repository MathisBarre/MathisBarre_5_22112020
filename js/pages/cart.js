let this.products

(() => {
  
  if (!localStorage.getItem('shoppingCart')) return
  document.getElementById('noProduct').style.display = 'none'
  this.products = JSON.parse(localStorage.getItem('shoppingCart'))
  console.log(this.products)
  Object.values(this.products).forEach(product => {
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
    updateProductQuantity(product._id, e.target.selectedIndex + 1)
  })

  const productInCartQuantity = this.products[product._id].quantity
  cloneElt.getElementById('productQuantityPlus').addEventListener('click', (e) => {
    e.preventDefault()
    updateProductQuantity(product._id, productInCartQuantity)
  })
  cloneElt.getElementById('productQuantityMinus').addEventListener('click', (e) => {
    e.preventDefault()
    updateProductQuantity(product._id, productInCartQuantity)
  })

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}

function updateProductQuantity(productId, quantity) {
  this.products[productId].quantity = quantity
  console.log(this.products[productId].quantity)
  localStorage.setItem('shoppingCart', JSON.stringify(this.products))
}