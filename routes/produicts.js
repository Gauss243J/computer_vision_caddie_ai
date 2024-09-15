const express = require('express');
const router = express.Router();
const Product = require('../models/Produict');

// Afficher tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Produict.find(); // Correction du nom du modèle
        res.json(produicts); // Retourne les produits en format JSON
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
    }
});

module.exports = router;
