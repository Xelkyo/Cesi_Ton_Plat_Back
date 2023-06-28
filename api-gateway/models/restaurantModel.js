const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestaurantManager'
    },
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Restaurant address is required'],
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
}, { timestamps: true })

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant;