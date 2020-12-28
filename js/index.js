function displayProduct(product) {
  // Get template
  const templateElt = document.getElementById('product')

  // Clone template
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  cloneElt.getElementById('productDescription').textContent = product.description
  cloneElt.getElementById('productLink').href = `/products.html?id=${product._id}`

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}

fetch('http://localhost:3000/api/teddies')
  .then(res => res.json())
  .then(products => {
    // Clear loading box
    document.getElementById('productsList').innerHTML = ''

    // Display each product 
    products.forEach(product => {displayProduct(product)});
  })
  .catch(error => alert(error))