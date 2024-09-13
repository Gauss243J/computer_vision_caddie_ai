const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import du modèle Product

// Route pour afficher le formulaire d'ajout de stock pour un produit
router.get('/addStock/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Produit non trouvé');
        }
        res.render('addStock', { product });
    } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
        res.status(500).send('Erreur lors de la récupération du produit.');
    }
});

// Route pour traiter l'ajout du stock
router.post('/addStock/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const { quantity } = req.body;

        if (!product) {
            return res.status(404).send('Produit non trouvé');
        }

        // Ajout de la quantité au stock existant
        product.stock += parseInt(quantity);
        await product.save();

        res.redirect('/products'); // Redirection vers la page des produits après mise à jour du stock
    } catch (error) {
        console.error('Erreur lors de l\'ajout du stock :', error);
        res.status(500).send('Erreur lors de l\'ajout du stock.');
    }
});

module.exports = router;
