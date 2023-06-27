const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3002;
const features = require('./config/features.json');

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/order', require('./routes/orderRoutes'));

app.listen(port, () => {
    console.log(`Server started on ${port}`)
    fetch('http://localhost:5000/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(features)
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
})