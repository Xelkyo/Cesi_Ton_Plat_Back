const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/user', userController.createUser)
router.get('/users', userController.getUsers) // accessed by sales only
router.get('/user/:id', userController.getUserById)
router.delete('/user/:id', userController.deleteUser)
router.put('/user/:id', userController.updateUser)

module.exports = router