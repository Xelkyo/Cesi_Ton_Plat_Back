const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
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
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurant_manager', 'deliverer'], // sales_service, technical_service, third_party_service
        default: 'user',
        required: [true, 'Role is required']
    },
    /* role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Role is required']
    }, */
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
    referrals: [
        {
            referredUserId: mongoose.Schema.Types.ObjectId
        }
    ],
    refreshToken: {
        type: String
    }
}, { timestamps: true })

const roleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const User = mongoose.model('User', userSchema)

module.exports =  User