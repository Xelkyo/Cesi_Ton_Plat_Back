const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const routes = require('./routes/index')


app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Gestion des CORS
const cors = require('../controllers/corsController')
app.use(cors.corsHandler)

//Creation endpoint
app.use('/', routes)



app.listen(port, () => {
    console.log(`Gateway started on ${port}`)
    })