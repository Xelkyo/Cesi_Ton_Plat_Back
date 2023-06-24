const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
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
    },
    menuItems: [{
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    }]
})

const Menu = mongoose.model('Menu', menuSchema)
module.exports = { Menu }