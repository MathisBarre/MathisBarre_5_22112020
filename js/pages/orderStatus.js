;(() => {
  const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR'
  document.getElementById('commandId').textContent = orderId
})()
