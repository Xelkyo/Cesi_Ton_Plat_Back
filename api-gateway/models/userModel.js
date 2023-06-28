const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    lastName: {
        type: String
    },
    firstName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    birthday: {
        type: Date
    },
    role: {
        type: String
    },
    transport: {
        type: String
    },
    restaurants: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)