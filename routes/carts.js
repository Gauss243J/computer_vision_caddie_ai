const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Afficher tous les paniers
router.get('/', async (req, res) => {
    const carts = await Cart.find();
    res.render('carts', { carts });
});

// Ajouter un panier
router.post('/add', async (req, res) => {
    const { number } = req.body;
    const newCart = new Cart({ 
        number, 
        date: new Date() // Enregistrer la date de création du panier
    });
    await newCart.save();
    res.redirect('/carts');
});

// Supprimer un panier
router.post('/delete/:id', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.redirect('/carts');
});

module.exports = router;
