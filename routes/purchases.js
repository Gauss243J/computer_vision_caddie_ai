const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Assurez-vous d'importer Product


// Afficher tous les achats
router.get('/', async (req, res) => {
    const purchases = await Purchase.find();
    res.render('purchases', { purchases });
});

// Détails d'un achat
router.get('/details/:id', async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);
    res.render('purchaseDetails', { purchase });
});

/*// Afficher le formulaire d'ajout d'achat
router.get('/add', async (req, res) => {
    const products = await Product.find();
    res.render('addPurchase', { products });
});*/

router.post('/add', async (req, res) => {
    try {
        const { cartNumber, products } = req.body;
        const productList = JSON.parse(products); // Assurez-vous que products contient [{ "productId": "id", "quantity": 2 }]

        const productDetails = await Product.find({
            _id: { $in: productList.map(p => p.productId) }
        });

        const purchaseProducts = productList.map(p => {
            const productDetail = productDetails.find(pd => pd._id.toString() === p.productId);
            if (productDetail) {
                if (productDetail.stock < p.quantity) {
                    throw new Error(`Stock insuffisant pour le produit: ${productDetail.name}`);
                }
                // Réduire le stock du produit
                productDetail.stock -= p.quantity;
                productDetail.save(); // Mise à jour du stock dans la base

                return {
                    productId: p.productId,
                    productName: productDetail.name,  // Récupérer le nom du produit
                    priceUnit: productDetail.price,  // Récupérer le prix unitaire
                    quantity: p.quantity,
                    totalPrice: productDetail.price * p.quantity  // Calcul du prix total
                };
            }
        });

        const newPurchase = new Purchase({
            cartNumber,
            products: purchaseProducts,
            date: new Date() // Ajouter la date de l'achat
        });

        await newPurchase.save();
        res.redirect('/purchases');
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un achat :', error);
        res.status(500).send('Erreur lors de l\'ajout d\'un achat.');
    }
});

router.post('/adds', async (req, res) => {
    try {
        const { cartNumber, products } = req.body;

        // Vérifier si "products" est déjà un objet, sinon essayer de le parser
        let productList;
        if (typeof products === 'string') {
            productList = JSON.parse(products); // Si c'est une chaîne, parser en JSON
        } else {
            productList = products; // Sinon, c'est déjà un objet
        }

        const productDetails = await Product.find({
            _id: { $in: productList.map(p => p.productId) }
        });

        const purchaseProducts = productList.map(p => {
            const productDetail = productDetails.find(pd => pd._id.toString() === p.productId);
            if (productDetail) {
                if (productDetail.stock < p.quantity) {
                    throw new Error(`Stock insuffisant pour le produit: ${productDetail.name}`);
                }
                // Réduire le stock du produit
                productDetail.stock -= p.quantity;
                productDetail.save(); // Mise à jour du stock dans la base

                return {
                    productId: p.productId,
                    productName: productDetail.name,  // Récupérer le nom du produit
                    priceUnit: productDetail.price,  // Récupérer le prix unitaire
                    quantity: p.quantity,
                    totalPrice: productDetail.price * p.quantity  // Calcul du prix total
                };
            }
        });

        const newPurchase = new Purchase({
            cartNumber,
            products: purchaseProducts,
            date: new Date() // Ajouter la date de l'achat
        });

        await newPurchase.save();
        res.status(200).json({ message: 'BIEN' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un achat :', error);
        res.status(500).send('Erreur lors de l\'ajout d\'un achat.');
    }
});

module.exports = router;
