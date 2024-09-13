const mongoose = require('mongoose');

// Schéma des produits pour les achats
const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Référence à l'ID du produit
    productName: String, // Nom du produit pour faciliter l'affichage dans les factures
    priceUnit: Number, // Prix unitaire du produit
    quantity: Number, // Quantité achetée
    totalPrice: Number // Prix total pour ce produit
});

// Schéma des achats
const purchaseSchema = new mongoose.Schema({
    cartNumber: { type: Number, required: true }, // Numéro de panier
    products: [productSchema], // Liste des produits achetés
    date: { type: Date, default: Date.now } // Date de l'achat
});

module.exports = mongoose.model('Purchase', purchaseSchema);
