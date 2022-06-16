const express = require('express')
const app = express()
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
app.post('/contact', async (req, res) => {
  const { name, email, selected } = req.body
  const selectedString = Object.keys(selected)
    .filter((key) => selected[key])
    .join(', ')

  if (name.trim() === '' || email.trim() === '') {
    return res.status(400).json({ message: 'Please fill all the fields' })
  }

  const data = await prisma.contactInfo.create({
    data: {
      email,
      name,
      selected: selectedString,
    },
  })

  res.json({ data })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))
