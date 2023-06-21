const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Gestion des CORS
const corsMiddleware = require('./middlewares/corsMiddleware');
app.options('*', corsMiddleware);

//Creation endpoint
app.use('/', require('./routes/index'))



app.listen(port, () => {
    console.log(`Gateway started on ${port}`)
    })