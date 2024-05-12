const express = require('express');
const router = express.Router();
const { Product } = require('../../models/models');

router.post('/', async (req, res) => {
    try {
        const { name, inventory, price, pickupAddress } = req.body;
        const product = await Product.create({ name, inventory, price, pickupAddress });
        res.json({ productId: product._id });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new Error('Product not found');
        res.json(product);
    } catch (err) {
        res.status(404).json({ success: false, error: err.message });
    }
});

module.exports = router;
