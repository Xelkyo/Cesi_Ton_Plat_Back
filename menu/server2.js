const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3004;
const features = require('./config/features.json')

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/menuRoutes'));

app.listen(port, () => {
    console.log(`Server started on ${port}`)
});