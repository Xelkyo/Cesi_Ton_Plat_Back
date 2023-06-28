const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        required: falses
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        required: false
    },
    image: {
        type: String,
        required: false
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemsSchema);

module.exports = MenuItem;