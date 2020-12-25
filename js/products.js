function displayProduct(product) {
  console.log(product)

  document.getElementById('productImage').src = product.imageUrl
  document.getElementById('productName').textContent = product.name
  document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  document.getElementById('productDescription').textContent = product.description
  document.getElementById('productLink').href = `/products.html?id=${product._id}`
  document.getElementById('productColor1').style.backgroundColor = product.colors[0]
  document.getElementById('productColor2').style.backgroundColor = product.colors[1]
  document.getElementById('productColor3').style.backgroundColor = product.colors[2]
  document.getElementById('productColor4').style.backgroundColor = product.colors[3]
  document.getElementById('productColor5').style.backgroundColor = product.colors[4]
}

// Search the product ID in URL
const productId = new URL(window.location.href).searchParams.get('id')

fetch(`http://localhost:3000/api/teddies/${productId}`)
  .catch(error => console.log(error))
  .then(response => response.json())
  .then(product => displayProduct(product))