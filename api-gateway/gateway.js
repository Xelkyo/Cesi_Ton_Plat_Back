const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Gestion des CORS
app.use(cors())


//Creation endpoint
app.use('/', require('./routes/index'))



app.listen(port, () => {
    console.log(`Gateway started on ${port}`)
    })