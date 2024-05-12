const express = require('express');
const router = express.Router();

const buyerRoutes = require('./buyerRoutes');
const productRoutes = require('./productRoutes');
const pincodeRoutes = require('./pincodeRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/buyers', buyerRoutes);
router.use('/products', productRoutes);
router.use('/pincodes', pincodeRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
