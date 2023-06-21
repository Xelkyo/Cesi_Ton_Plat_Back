const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
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
        required: false
    },
    category: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    menuItems: [{
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    }]
});


const Menu = mongoose.model('Menu', menuSchema);

module.exports = { Menu };
