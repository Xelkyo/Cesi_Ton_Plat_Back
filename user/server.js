const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

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
