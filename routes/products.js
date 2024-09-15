const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Afficher tous les produits
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('products', { products });
});

// Afficher tous les produits
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Correction du nom du modèle
        res.json(products); // Retourne les produits en format JSON
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
    }
});

// Ajouter un produit
router.post('/add', async (req, res) => {
    const { name, price, stock } = req.body;
    const newProduct = new Product({ 
        name, 
        price, 
        stock, // Ajout du stock
        date: new Date() // Enregistrement de la date courante
    });
    await newProduct.save();
    res.redirect('/products');
});



// Supprimer un produit
router.post('/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
});

module.exports = router;
