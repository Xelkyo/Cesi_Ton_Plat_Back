const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Gestion des CORS
var corsoption = {
    "origin": "*",
    "allowedHeaders": "Content-Type,Authorization",
    "methods": "GET,PUT,POST,DELETE",
    "credentials": true,
    "maxAge": 900,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsoption))


//Creation endpoint
app.use('/', require('./routes/index'))



app.listen(port, () => {
    console.log(`Gateway started on ${port}`)
})