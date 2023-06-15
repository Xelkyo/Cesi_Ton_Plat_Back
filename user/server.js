const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000

const connectDB = require('./config/db')
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Home Page!');
  });

app.use('/', require('./routes/authRoutes'))

app.listen(port, () => {
 console.log(`Server started on ${port}`)
})
