const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Manager ID is required']
    },
    restaurantName: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true
    },
    restaurantAddress: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
        trim: true
    },
    restaurantPhone: {
        type: String,
        required: false,
        trim: true
    },
    restaurantEmail: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true
    },
}, { timestamps: true })

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant