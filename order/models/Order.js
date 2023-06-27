const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Restaurant is required']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Customer is required']
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
    menus: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
        required: [true, 'Menus are required']
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
        enum: ['pending', 'accepted', 'preparing', 'delivering', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required']
    },
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;