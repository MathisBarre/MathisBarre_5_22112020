function displayProduct(product) {
  // Get template
  const template = document.getElementById('product')

  // Clone template
  const clone = document.importNode(template.content, true)

  // Hydrate template
  clone.getElementById('productImage').src = product.imageUrl
  clone.getElementById('productName').textContent = product.name
  clone.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  clone.getElementById('productDescription').textContent = product.description
  clone.getElementById('productLink').href = `/products.html?id=${product._id}`

  // Display template
  document.getElementById('productsList').appendChild(clone)
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