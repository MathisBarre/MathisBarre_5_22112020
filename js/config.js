let apiUrl =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://oc-devweb-p5-api.herokuapp.com'
