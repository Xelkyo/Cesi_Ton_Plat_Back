const mongoose = require('mongoose');

const restaurantManagerSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        default: 'restaurantManager'
    },
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
}, { timestamps: true })

const RestaurantManager = mongoose.model('RestaurantManager', restaurantManagerSchema)

