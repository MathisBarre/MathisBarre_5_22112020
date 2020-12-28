function displayProduct(product) {
  console.log(product)

  // Hydrate page with data
  document.getElementById('productImage').src = product.imageUrl
  document.getElementById('productName').textContent = product.name
  document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  document.getElementById('productDescription').textContent = product.description
  document.getElementById('productColors').style.gridTemplateColumns = `repeat(${product.colors.length}, 1fr)`

  // Get parent element
  const colorsElt = document.getElementById('productColors')

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

// Search the product ID in URL
const productId = new URL(window.location.href).searchParams.get('id')

fetch(`${apiUrl}/api/teddies/${productId}`)
  .catch(error => console.log(error))
  .then(response => response.json())
  .then(product => displayProduct(product))