const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Dashboard
router.get('/', async (req, res) => {
    const purchases = await Purchase.find().sort({ date: -1 }).limit(5);

    // Récupérer les données pour le graphique
    const salesData = await Purchase.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                total: { $sum: { $sum: "$products.totalPrice" } }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    const dates = salesData.map(sale => sale._id);
    const totals = salesData.map(sale => sale.total);

    res.render('index', { recentPurchases: purchases, salesData: { dates, totals } });
});

module.exports = router;

