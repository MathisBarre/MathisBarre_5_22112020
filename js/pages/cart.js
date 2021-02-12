;(() => {
  console.log('Javascript is loaded')
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

  addEventListeners()
}

function displayProduct(product) {
  // Get & clone template
  const templateElt = document.getElementById('productTemplate')
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productQuantity').selectedIndex = product.quantity - 1
  cloneElt.getElementById('productPrice').textContent = product.price / 100 + '.00€'

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

function addEventListeners() {
  // Purchase button
  document.getElementById('confirmPurchase').onclick = (e) => {
    e.preventDefault()
    sendOrder()
  }

  // Form validation
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/

  watchValidity(document.getElementById('firstname'), 'e.target.value.length > 1')
  watchValidity(document.getElementById('lastname'), 'e.target.value.length > 1')
  watchValidity(document.getElementById('email'), emailRegex + '.test(e.target.value)')
  watchValidity(document.getElementById('adress'), 'e.target.value.length > 6')
  watchValidity(document.getElementById('zipcode'), zipcodeRegex + '.test(e.target.value)')
}

function watchValidity(elt, condition) {
  elt.oninput = (e) => {
    if (eval(condition)) {
      validInputElt(e.target)
    } else {
      neutralInputElt(e.target)
    }
  }

  elt.onblur = (e) => {
    if (!eval(condition)) {
      invalidInputElt(e.target)
    }
  }
}

function validInputElt(elt) {
  elt.style.border = 'solid 1px green'
  elt.style.boxShadow = '#00800066 0px 0px 4px'
}

function invalidInputElt(elt) {
  elt.style.border = 'solid 1px red'
  elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
}

function neutralInputElt(elt) {
  elt.style.border = ''
  elt.style.boxShadow = ''
}

function sendOrder() {
  const firstname = document.getElementById('firstname').value
  const lastname = document.getElementById('lastname').value
  const adress =
    document.getElementById('adress').value + ' ' + document.getElementById('zipcode').value
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
