var dotenv= require('dotenv');
dotenv.config({path: './Config.env'});
const mongoClient = require("mongodb").MongoClient;

const express = require('express');
const mongoose = require('mongoose');
//const stockRoutes = require('./routes/stock');
const path = require('path');
const app = express();
const PORT = 3000;

//console.log(process.env.DB)
// Database connection  process.env.DB
mongoose.connect(process.env.DB)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Pour traiter le JSON dans req.body
app.use(express.urlencoded({ extended: true })); // Pour traiter les données de formulaire

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/products'));
app.use('/produicts', require('./routes/produicts'));
app.use('/carts', require('./routes/carts'));
app.use('/purchases', require('./routes/purchases'));
app.use('/stock',  require('./routes/stock'));

app.listen(PORT, () => {
    //console.log(process.env.DB)
    console.log(`Server running on http://localhost:${PORT}`);
});
