const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Restaurant Id is required']
    },
    restaurantName: {
        type: mongoose.Schema.Types.String,
        ref: 'Restaurant',
        required: [true, 'Restaurant Name is required']
    },
    restaurantNumber: {
        type: mongoose.Schema.Types.String,
        ref: 'Restaurant',
        required: false
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Customer Id is required']
    },
    customerName: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: [true, 'Customer Name is required']
    },
    customerNumber: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: [true, 'Customer Phone is required']
    },
    delivererId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    items: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
        required: [true, 'Items are required']
    },
    deliveryAddress: {
        type: String,
        required: [true, 'Delivery address is required']
    },
    pickupAddress: {
        type: String,
        required: [true, 'Pickup address is required']
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required']
    },
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;