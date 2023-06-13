// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

// Initialisation d'Express
const app = express()


//Connexion à MongoDB
const connectDB = require('./config/db')
//Initialisation de Mongo
connectDB()


// Accepter les données envoyées par formulaire
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.use('/users', require('./routes/userRoute'))


app.listen(port, () => {
console.log(`Server started on ${port}`)
})