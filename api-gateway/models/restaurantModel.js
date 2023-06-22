const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restaurantManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestaurantManager'
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Restaurant', restaurantSchema)