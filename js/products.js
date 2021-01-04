// Global variables
let productId, product

// Main function, auto called at load time
(() => {
  // Search the product ID in URL
  productId = new URL(window.location.href).searchParams.get('id')

  // Fetch product data
  fetch(`${apiUrl}/api/teddies/${productId}`)
    .catch(error => console.log(error))
    .then(response => response.json())
    .then(productData => {
      product = productData
      displayProduct(product)
    })
})()

// Manage click on button 'add to cart'
document.getElementById('addToCart').addEventListener('click', (e) => {
  e.preventDefault()

  // Get current shopping cart
  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))

  // Manage empty or bad localStorage
  if ( shoppingCart === null || typeof shoppingCart !== "object" ) shoppingCart = {}

  // If product is already in cart
  if ( shoppingCart[product._id] ) {
    // Increase quantity
    shoppingCart[product._id].quantity++
  } else {
    // Add product
    shoppingCart[product._id] = {
      quantity: 1,
      ...product
    }
  }

  // Save new shopping cart
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

  // Redirect to shopping cart page
  window.location.href = `${window.location.origin}/cart.html?lastAddedProductId=${product._id}`
})

// Hydrate product with api data 
function displayProduct(product) {
  // Hydrate page with data
  document.getElementById('productImage').src = product.imageUrl
  document.getElementById('productName').textContent = product.name
  document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  document.getElementById('productDescription').textContent = product.description
  document.getElementById('productColors').style.gridTemplateColumns = `repeat(${product.colors.length}, 1fr)`

  // Get parent element
  const colorsElt = document.getElementById('productColors')

  // Display all colors
  product.colors.forEach(color => {
    // Get template for one color
    const templateElt = document.getElementById('productColor')

    // Clone template
    const cloneElt = document.importNode(templateElt.content, true)

    // Hydrate color clone
    cloneElt.querySelector('div').style.backgroundColor = color

    // Display a new color
    colorsElt.appendChild(cloneElt)
  })
}