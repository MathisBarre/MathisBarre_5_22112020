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

  // Add event listeners
  document.getElementById('addToCart').addEventListener('click', addProductToCart )
})()

function addProductToCart(e) {
  e.preventDefault()

  Cart.addProduct(product)

  window.location.href = `${window.location.origin}/cart.html?lastAddedProductName=${product.name}`
}

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