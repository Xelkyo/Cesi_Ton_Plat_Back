const express = require('express')
const router = express.Router()

const {
    userRegister,
    userLogin,
    getUser
} = require('../controllers/userController')
