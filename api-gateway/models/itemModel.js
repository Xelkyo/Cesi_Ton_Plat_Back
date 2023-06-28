const mongoose = require('mongoose')

const menuItemsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('MenuItem', menuItemsSchema)