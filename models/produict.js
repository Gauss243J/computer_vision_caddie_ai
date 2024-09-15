const mongoose = require('mongoose');

const produictSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true // Nouveau champ pour gérer le stock
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Produict', produictSchema);

module.exports = Prodiuct;
