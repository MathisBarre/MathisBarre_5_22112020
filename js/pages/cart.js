;(() => {
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
  productList.forEach((product) => {
    displayProduct(product)
  })

  // Add page events listener
  document.getElementById('confirmPurchase').onclick = (e) => {
    e.preventDefault()
    sendOrder()
  }
}

function displayProduct(product) {
  // Get & clone template
  const templateElt = document.getElementById('productTemplate')
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productQuantity').selectedIndex =
    product.quantity - 1
  cloneElt.getElementById('productPrice').textContent =
    product.price / 100 + '.00€'
  // cloneElt.getElementById('productTotalPrice').textContent = (( product.price / 100 ) * product.quantity ) + ".00€"

  // Add events
  cloneElt.getElementById('productQuantity').onchange = (e) => {
    e.preventDefault()

    Cart.updateProductQuantity(product._id, e.target.selectedIndex + 1)

    cloneElt.getElementById('productTotalPrice').textContent =
      (product.price / 100) * product.quantity + '.00€'
  }

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}

function sendOrder() {
  const firstname = document.getElementById('firstname').value
  const lastname = document.getElementById('lastname').value
  const adress =
    document.getElementById('adress').value +
    ' ' +
    document.getElementById('zipcode').value
  const email = document.getElementById('email').value
  const city = document.getElementById('city').value

  const products = Object.values(Cart.products).map((product) => {
    return product._id
  })

  const order = {
    contact: {
      firstName: firstname,
      lastName: lastname,
      address: adress,
      city: city,
      email: email,
    },
    products: products,
  }

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  }

  fetch(`${apiUrl}/api/teddies/order`, requestOptions)
    .catch(() => {
      alert(error)
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      localStorage.removeItem('shoppingCart')
      window.location.href = `${window.location.origin}/orderStatus.html?orderId=${json.orderId}`
    })
}
