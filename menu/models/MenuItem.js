const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
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
        required: false
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