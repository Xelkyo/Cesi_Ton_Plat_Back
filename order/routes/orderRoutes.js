const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/order/:id', orderController.getOrderById)
router.post('/order', orderController.createOrder)
router.put('/order/:id', orderController.updateOrder)
router.get('/order/user/:id', orderController.getOrdersByUser)
router.get('/orders', orderController.getOrders)

module.exports = router