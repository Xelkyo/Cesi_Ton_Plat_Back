const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    birthday: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['customer', 'salesperson', 'restaurantmanager', 'deliveryperson']
    },
    transport: {
        type: String,
        enum: ['motorbike', 'bicycle', 'car', 'other'],
        default: function() {
            return this.role === 'deliveryperson' ? 'other' : undefined;
        }
    },
    restaurants: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
        default: function() {
            return this.role === 'restaurantmanager' ? [] : undefined;
        }
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports =  User