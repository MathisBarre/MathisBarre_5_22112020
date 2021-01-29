(() => {
  const productsInShoppingCart = getProductInShoppingCart()
  if (productsInShoppingCart === null) return
  hydratePage(productsInShoppingCart)
})()

function getProductInShoppingCart() {
  // Get product from local storage
  return JSON.parse(localStorage.getItem('shoppingCart'))
}

function hydratePage(productsInShoppingCart) {
  // Remove "no product" text
  document.getElementById('noProduct').style.display = 'none'
  
  // Loop over all products and displays them
  const productList = Object.values(productsInShoppingCart)
  productList.forEach(product => {
    displayProduct(product)
  })
}

function displayProduct(product) {
  // Get & clone template
  const templateElt = document.getElementById('productTemplate')
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productQuantity').selectedIndex = product.quantity - 1

  // Add events
  cloneElt.getElementById('productQuantity').onchange = (e) => {
    e.preventDefault()
    Cart.updateProductQuantity(
      product._id,
      e.target.selectedIndex + 1
    )
  }

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}

// function verifyForm() {

// }

// function sendOrder() {
//   const orderJsonExample = {
//     "contact": {
//       "firstName": "Mathis",
//       "lastName": "Barré",
//       "address": "17 rue du 3 septembre 49320",
//       "city": "Gennes Val de Loire",
//       "email": "mathis.barre@live.fr"
//     },
//     "products": [
//       "5be9c8541c9d440000665243",
//       "5be9c8541c9d440000665243",
//       "5be9c8541c9d440000665243",
//       "5be9c8541c9d440000665243"
//     ]
//   }
// }