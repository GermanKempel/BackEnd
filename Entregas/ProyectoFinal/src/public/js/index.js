const socket = io()

const form = document.getElementById('form')

const container = document.getElementById('container')


socket.on('showProducts', data => {
  container.innerHTML = ``

  data.forEach(prod => {
    container.innerHTML += `
            <ul>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
            </ul>
        `

    container.innerHTML += `<button id="delete-${prod.id}">Delete</button>`
    const deleteBtn = document.getElementById(`delete-${prod.id}`)
    deleteBtn.addEventListener('click', () => {
      sendId(prod.id)
    })
  })
})

async function sendDataForm(form) {
  const url = '/api/products'
  const data = new FormData(form)
  const response = await fetch(url, {
    method: 'POST',
    body: data
  })
  const result = await response.json()
  console.log(result)

  socket.emit('showProducts', result.products)
  return result
}


async function sendId(id) {
  const url = `/api/products/${id}`
  const response = await fetch(url, {
    method: 'DELETE'
  })
  const result = await response.json()
  console.log(result)
  return result
}
