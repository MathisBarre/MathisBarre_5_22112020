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

function displayProduct(product) {
  // Get template
  const templateElt = document.getElementById('product')

  // Clone template
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  const selectQuantityElt = cloneElt.getElementById('productQuantity')
  // cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  // cloneElt.getElementById('productDescription').textContent = product.description
  selectQuantityElt.selectedIndex = product.quantity - 1

  // Add events on selected option change 
  selectQuantityElt.onchange = (e) => {
    e.preventDefault()
    Cart.updateProductQuantity(product._id, e.target.selectedIndex + 1)
  }

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}

function verifyForm() {

}

function sendOrder() {
  const orderJsonExample = {
    "contact": {
      "firstName": "Mathis",
      "lastName": "Barré",
      "address": "17 rue du 3 septembre 49320",
      "city": "Gennes Val de Loire",
      "email": "mathis.barre@live.fr"
    },
    "products": [
      "5be9c8541c9d440000665243",
      "5be9c8541c9d440000665243",
      "5be9c8541c9d440000665243",
      "5be9c8541c9d440000665243"
    ]
  }
}