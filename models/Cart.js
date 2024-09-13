const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Date par défaut lors de la création
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
