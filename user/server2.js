const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT2 || 3003
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const features = require('./config/features.json')

const connectDB = require('./config/db')
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Home Page!');
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
