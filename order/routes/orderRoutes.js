const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/order/:id', orderController.getOrderById)
router.post('/order', orderController.createOrder)
router.put('/order/:id', orderController.updateOrder)

module.exports = router