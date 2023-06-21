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
    menus: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
        required: [true, 'Menus are required']
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