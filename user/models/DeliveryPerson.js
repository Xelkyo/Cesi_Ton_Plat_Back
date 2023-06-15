const mongoose = require('mongoose');

const deliveryPersonSchema = new mongoose.Schema({
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
    transport: {
        type: String,
        enum: ['motorbike', 'bicycle', 'car', 'other'],
        default: 'other',
        required: false,
        trim: true
    },
    role: {
        type: String,
        default: 'deliveryPerson'
    }
}, { timestamps: true })

const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema)

module.exports =  DeliveryPerson