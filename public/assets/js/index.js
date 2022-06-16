const form = document.querySelector('#contact-form')
const formName = document.querySelector('#name')
const formEmail = document.querySelector('#email')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = formName.value
  const email = formEmail.value

  if (name === '' || email === '') {
    return alert('Please fill all fields')
  }

  const selected = {}
  checkboxes.forEach((checkbox) => {
    selected[checkbox.name] = checkbox.checked
  })

  window
    .fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        selected,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      console.log('working')
    })
})
